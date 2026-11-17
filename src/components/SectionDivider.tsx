type SectionDividerProps = {
  from: "light";
};

const colors = {
  light: "#ffffff",
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

export function SectionDivider({ from }: SectionDividerProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none relative z-10 -mb-8 h-8 w-full sm:-mb-10 sm:h-10">
      <div className="absolute inset-0" style={{ ...beardEdgeMask, backgroundColor: colors[from] }} />
    </div>
  );
}
