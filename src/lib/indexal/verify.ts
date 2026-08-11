import "server-only";

import crypto from "node:crypto";

/**
 * Indexal signs each delivery with HMAC-SHA256 over `timestamp + "." + rawBody`
 * and also sends the shared secret as a bearer token. Both are checked here,
 * against the *raw* body — re-serialising the parsed JSON would change the
 * bytes and break the signature.
 */

// Indexal's docs: reject deliveries whose timestamp is more than 5 minutes off.
const TOLERANCE_SECONDS = 300;

export type VerificationResult =
  | { ok: true }
  | { ok: false; status: number; reason: string };

function timingSafeEquals(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);

  // timingSafeEqual throws on length mismatch, so the lengths are compared
  // first. Length is not secret here — both values are fixed-width hex digests
  // or a token whose length carries no useful information on its own.
  return (
    bufferA.length === bufferB.length && crypto.timingSafeEqual(bufferA, bufferB)
  );
}

export function verifyIndexalRequest({
  rawBody,
  signature,
  timestamp,
  authorization,
  secret,
}: {
  rawBody: string;
  signature: string | null;
  timestamp: string | null;
  authorization: string | null;
  secret: string;
}): VerificationResult {
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return { ok: false, status: 401, reason: "missing bearer token" };
  }

  if (!timingSafeEquals(authorization.slice("Bearer ".length), secret)) {
    return { ok: false, status: 401, reason: "invalid bearer token" };
  }

  if (!timestamp || !signature) {
    return { ok: false, status: 401, reason: "missing signature headers" };
  }

  const sentAtSeconds = Number(timestamp);
  if (!Number.isFinite(sentAtSeconds)) {
    return { ok: false, status: 401, reason: "invalid timestamp" };
  }

  if (Math.abs(Date.now() / 1000 - sentAtSeconds) > TOLERANCE_SECONDS) {
    return { ok: false, status: 401, reason: "stale timestamp" };
  }

  const expected =
    "sha256=" +
    crypto
      .createHmac("sha256", secret)
      .update(`${timestamp}.${rawBody}`)
      .digest("hex");

  if (!timingSafeEquals(signature, expected)) {
    return { ok: false, status: 401, reason: "signature mismatch" };
  }

  return { ok: true };
}
