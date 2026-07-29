// Schematic / blueprint-style artwork for the vending machine, split into
// three physically-accurate parts so the Hero section can animate them
// together with GSAP. Replace with real product photography later by
// swapping the <svg> content inside each part — the wrapper sizes/ids stay.

export function VMTop() {
  return (
    <svg viewBox="0 0 400 150" className="w-full block" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 150 V40 Q20 10 50 10 H350 Q380 10 380 40 V150 Z" fill="#0c3a34" />
      <path d="M20 150 V40 Q20 10 50 10 H350 Q380 10 380 40 V150 Z" fill="url(#topGrad)" opacity="0.9" />
      <defs>
        <linearGradient id="topGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f4a42" />
          <stop offset="1" stopColor="#0c3a34" />
        </linearGradient>
      </defs>
      {/* brand plate */}
      <rect x="150" y="28" width="100" height="16" rx="4" fill="#00a693" />
      <text x="200" y="40" textAnchor="middle" fontSize="10" fill="#f2fffd" fontFamily="sans-serif" fontWeight="700">
        ROBOT MARKET
      </text>
      {/* smart UI screen */}
      <rect x="130" y="58" width="140" height="80" rx="8" fill="#04211d" stroke="#00bba6" strokeWidth="2" />
      <rect x="140" y="68" width="120" height="46" rx="4" fill="#00a693" opacity="0.25" />
      <rect x="140" y="68" width="70" height="6" rx="3" fill="#00bba6" />
      <rect x="140" y="80" width="90" height="4" rx="2" fill="#00bba6" opacity="0.6" />
      <rect x="140" y="90" width="60" height="4" rx="2" fill="#00bba6" opacity="0.6" />
      <circle cx="250" cy="126" r="6" fill="#00bba6" />
      {/* cooling vents */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={36} y={34 + i * 8} width="60" height="3" rx="1.5" fill="#00bba6" opacity="0.5" />
      ))}
    </svg>
  );
}

export function VMMiddle() {
  return (
    <svg viewBox="0 0 400 300" className="w-full block" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="0" width="360" height="300" fill="#0e4841" />
      {/* glass front */}
      <rect x="42" y="18" width="316" height="264" rx="6" fill="#04211d" stroke="#00a693" strokeWidth="2" />
      {/* product coils - 3 rows x 4 columns */}
      {[0, 1, 2].map((row) => (
        <g key={row}>
          {[0, 1, 2, 3].map((col) => (
            <g key={col}>
              <rect
                x={58 + col * 74}
                y={34 + row * 84}
                width="60"
                height="70"
                rx="4"
                fill="#0c3a34"
                stroke="#00bba6"
                strokeOpacity="0.5"
              />
              {[0, 1, 2, 3].map((c) => (
                <circle
                  key={c}
                  cx={58 + col * 74 + 12 + c * 12}
                  cy={34 + row * 84 + 35}
                  r="9"
                  fill="#00a693"
                  opacity="0.65"
                />
              ))}
            </g>
          ))}
        </g>
      ))}
      {/* LED strip */}
      <rect x="20" y="0" width="8" height="300" fill="#00bba6" opacity="0.8" />
      <rect x="372" y="0" width="8" height="300" fill="#00bba6" opacity="0.8" />
    </svg>
  );
}

export function VMBottom() {
  return (
    <svg viewBox="0 0 400 150" className="w-full block" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0 H380 V110 Q380 140 350 140 H50 Q20 140 20 110 Z" fill="#0c3a34" />
      {/* payment terminal */}
      <rect x="70" y="20" width="90" height="60" rx="6" fill="#04211d" stroke="#00a693" strokeWidth="2" />
      <rect x="80" y="30" width="70" height="16" rx="3" fill="#00a693" opacity="0.4" />
      <rect x="80" y="52" width="30" height="18" rx="3" fill="#00bba6" />
      <text x="95" y="65" textAnchor="middle" fontSize="9" fill="#04211d" fontWeight="700">
        POS
      </text>
      {/* coin slot + card reader */}
      <rect x="150" y="52" width="4" height="16" rx="2" fill="#00bba6" />
      {/* dispense flap */}
      <rect x="240" y="30" width="110" height="60" rx="8" fill="#04211d" stroke="#00bba6" strokeWidth="2" />
      <rect x="255" y="70" width="80" height="8" rx="4" fill="#00a693" />
      <text x="295" y="52" textAnchor="middle" fontSize="9" fill="#00bba6" fontFamily="sans-serif">
        محل تحویل کالا
      </text>
      {/* legs */}
      <rect x="60" y="132" width="16" height="16" rx="2" fill="#0c3a34" stroke="#00a693" />
      <rect x="324" y="132" width="16" height="16" rx="2" fill="#0c3a34" stroke="#00a693" />
    </svg>
  );
}
