import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Focus Labs Media Group — Ideas need a place to exist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "white",
          background: "linear-gradient(145deg, #000 35%, #15110c 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 5, textTransform: "uppercase" }}>Focus Labs Media Group</div>
        <div
          style={{
            position: "absolute",
            width: 470,
            height: 470,
            border: "2px solid rgba(255,149,0,.75)",
            borderRadius: "50%",
            right: -30,
            top: 80,
            boxShadow: "0 0 90px rgba(255,149,0,.2)",
          }}
        />
        <div style={{ display: "flex", maxWidth: 800, fontSize: 74, lineHeight: 1.03, letterSpacing: -3 }}>
          We give ideas a place to exist.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22, color: "#b8b8bd" }}>
          <span style={{ width: 60, height: 2, background: "#ff9500" }} />
          Narrative · Strategy · Creative Direction · Production
        </div>
      </div>
    ),
    size,
  );
}
