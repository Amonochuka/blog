type SectionDividerProps = {
  from: "light" | "dark";
  to: "light" | "dark";
};

const colors = {
  light: "#ffffff",
  dark: "#0b0a08",
};

const beardEdgeMask = {
  maskImage: "url('/images/beard-edge-mask.svg')",
  maskSize: "100% 600px",
  maskRepeat: "no-repeat",
  maskPosition: "bottom",
  WebkitMaskImage: "url('/images/beard-edge-mask.svg')",
  WebkitMaskSize: "100% 600px",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "bottom",
};

export function SectionDivider({ from, to }: SectionDividerProps) {
  return (
    <div aria-hidden="true" className="relative h-8 w-full overflow-hidden sm:h-10" style={{ backgroundColor: colors[to] }}>
      <div className="absolute inset-0" style={{ ...beardEdgeMask, backgroundColor: colors[from] }} />
    </div>
  );
}
