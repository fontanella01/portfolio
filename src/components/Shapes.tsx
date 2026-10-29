// Flat geometric shapes in the neighbouring section colors. Pure decoration:
// hidden from screen readers and kept behind the content.
const PURPLE = "#4c3bff";
const GREEN = "#0f7a5f";
const MUSTARD = "#f2c14e";
const PINK = "#ff6f91";

type Variant = "purple" | "green" | "mustard" | "pink" | "ink";

const SETS: Record<Variant, React.ReactNode> = {
  purple: (
    <>
      <circle cx="1180" cy="90" r="120" fill={MUSTARD} />
      <rect x="-40" y="520" width="150" height="150" rx="18" fill={PINK} transform="rotate(18 35 595)" />
      <path d="M1040 640 L1140 470 L1240 640 Z" fill={GREEN} />
    </>
  ),
  green: (
    <>
      <path d="M1200 0 A160 160 0 0 1 1200 320 Z" fill={MUSTARD} />
      <circle cx="40" cy="620" r="70" fill={PURPLE} />
    </>
  ),
  mustard: (
    <>
      <rect x="1120" y="40" width="130" height="130" rx="16" fill={PURPLE} transform="rotate(-14 1185 105)" />
      <circle cx="-20" cy="560" r="110" fill={PINK} />
    </>
  ),
  pink: (
    <>
      <circle cx="1210" cy="560" r="130" fill={PURPLE} />
      <path d="M0 40 L120 40 L0 180 Z" fill={MUSTARD} />
    </>
  ),
  ink: (
    <>
      <circle cx="1150" cy="120" r="90" fill={PINK} />
      <rect x="30" y="480" width="120" height="120" rx="14" fill={MUSTARD} transform="rotate(12 90 540)" />
      <path d="M1060 660 L1160 500 L1260 660 Z" fill={GREEN} />
    </>
  ),
};

export function Shapes({ variant }: { variant: Variant }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1240 700"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
    >
      {SETS[variant]}
    </svg>
  );
}

export type { Variant as ShapeVariant };
