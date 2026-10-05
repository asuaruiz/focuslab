export default function AnimatedPortal() {
  return (
    <div className="portal-wrap" aria-hidden="true">
      <div className="portal-ambient" />
      <svg className="portal-svg" viewBox="0 0 640 560" fill="none" role="presentation">
        <defs>
          <linearGradient id="portal-orbit" x1="90" y1="70" x2="548" y2="490" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffe2bb" /><stop offset=".32" stopColor="#f59e0b" /><stop offset=".7" stopColor="#ffc174" stopOpacity=".78" /><stop offset="1" stopColor="#855300" stopOpacity=".18" />
          </linearGradient>
          <linearGradient id="portal-trail" x1="0" y1="150" x2="650" y2="430" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7f4d0b" stopOpacity="0" /><stop offset=".42" stopColor="#ffcf7a" /><stop offset="1" stopColor="#b36d0d" stopOpacity=".16" />
          </linearGradient>
          <filter id="portal-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id="portal-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="12" /></filter>
        </defs>
        <circle className="portal-halo" cx="336" cy="282" r="213" stroke="#39404f" strokeDasharray="6 16" strokeWidth="1.5" />
        <circle className="portal-dots" cx="336" cy="282" r="190" stroke="#f59e0b" strokeDasharray="2 15" strokeOpacity=".5" />
        <circle className="portal-glow-ring" cx="336" cy="282" r="172" stroke="url(#portal-orbit)" strokeWidth="8" filter="url(#portal-blur)" />
        <circle className="portal-ring" cx="336" cy="282" r="166" stroke="#ffe0bb" strokeOpacity=".82" strokeWidth="2" />
        <circle cx="336" cy="282" r="138" fill="#6d4210" opacity=".08" filter="url(#portal-soft)" />
        <g className="portal-trails"><path d="M-24 130 C 116 110 201 224 292 269 C 390 317 476 421 680 457" stroke="url(#portal-trail)" strokeWidth="8" filter="url(#portal-blur)" /><path d="M22 76 C 179 94 238 194 326 258 C 417 325 500 389 646 374" stroke="url(#portal-orbit)" strokeOpacity=".65" strokeWidth="2.2" /></g>
      </svg>
    </div>
  );
}
