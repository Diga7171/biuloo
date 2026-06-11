type CarVariant =
  | "sedan"
  | "crossover"
  | "suv"
  | "liftback"
  | "hatchback"
  | "pickup"
  | "minivan";

const BODY_PATHS: Record<CarVariant, string> = {
  sedan:
    "M8 62 C10 50 22 46 34 45 L52 32 C58 27 67 24 78 24 L132 24 C144 24 153 28 159 35 L172 45 C184 46 194 51 196 62 L196 70 L8 70 Z",
  crossover:
    "M6 60 C8 46 22 40 36 39 L50 26 C57 21 68 18 80 18 L130 18 C143 18 154 23 161 31 L176 41 C188 43 198 49 198 60 L198 72 L6 72 Z",
  suv:
    "M6 58 C7 42 20 36 34 35 L46 20 C53 15 65 12 80 12 L128 12 C142 12 153 17 160 25 L174 36 C188 39 198 45 198 58 L198 74 L6 74 Z",
  liftback:
    "M8 62 C9 50 20 46 32 45 L48 28 C55 22 66 19 80 19 L128 19 C141 19 151 24 158 32 L176 45 C186 47 195 52 196 62 L196 70 L8 70 Z",
  hatchback:
    "M10 62 C11 50 21 46 32 45 L50 30 C57 24 67 21 80 21 L122 21 C134 21 144 26 150 35 L172 45 C184 47 194 52 196 62 L196 70 L10 70 Z",
  pickup:
    "M6 62 C8 50 20 46 32 45 L46 28 C53 22 64 19 78 19 L110 19 L110 45 L182 45 C192 46 198 52 198 62 L198 70 L6 70 Z",
  minivan:
    "M6 60 C6 44 16 36 28 35 L34 22 C40 16 50 13 64 13 L150 13 C166 13 178 18 184 28 L192 38 C198 42 200 50 200 60 L200 72 L6 72 Z",
};

const WINDOW_PATHS: Record<CarVariant, string> = {
  sedan: "M58 33 L74 24 L130 24 L150 33 Z",
  crossover: "M54 32 L70 22 L134 22 L156 32 Z",
  suv: "M50 30 L68 18 L136 18 L158 30 Z",
  liftback: "M56 33 L72 23 L132 23 L154 33 Z",
  hatchback: "M56 35 L72 25 L126 25 L148 35 Z",
  pickup: "M58 33 L72 24 L104 24 L110 33 Z",
  minivan: "M50 27 L66 17 L168 17 L184 27 Z",
};

const WHEEL_X: Record<CarVariant, [number, number]> = {
  sedan: [56, 150],
  crossover: [56, 150],
  suv: [56, 150],
  liftback: [56, 150],
  hatchback: [56, 148],
  pickup: [56, 176],
  minivan: [58, 158],
};

export function CarSvg({
  variant = "sedan",
  accent = "#E2231A",
  className = "",
}: {
  variant?: string;
  accent?: string;
  className?: string;
}) {
  const resolvedVariant = (variant as CarVariant) in BODY_PATHS ? (variant as CarVariant) : "sedan";
  const path = BODY_PATHS[resolvedVariant];
  const windowPath = WINDOW_PATHS[resolvedVariant];
  const [wheelLeftX, wheelRightX] = WHEEL_X[resolvedVariant];

  return (
    <svg
      viewBox="0 0 204 90"
      className={className}
      role="img"
      aria-label="Иллюстрация автомобиля"
    >
      <defs>
        <linearGradient id={`grad-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} stopOpacity="0.95" />
          <stop offset="1" stopColor={accent} stopOpacity="0.65" />
        </linearGradient>
      </defs>
      {/* ground shadow */}
      <ellipse cx="102" cy="80" rx="92" ry="6" fill="currentColor" opacity="0.08" />
      {/* body */}
      <path d={path} fill={`url(#grad-${variant})`} />
      {/* window band */}
      <path d={windowPath} fill="white" opacity="0.35" />
      {/* wheels */}
      <circle cx={wheelLeftX} cy="72" r="13" fill="#1a1a1a" />
      <circle cx={wheelLeftX} cy="72" r="5.5" fill="#f7f5f2" />
      <circle cx={wheelRightX} cy="72" r="13" fill="#1a1a1a" />
      <circle cx={wheelRightX} cy="72" r="5.5" fill="#f7f5f2" />
    </svg>
  );
}
