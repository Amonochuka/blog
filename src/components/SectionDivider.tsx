type SectionDividerProps = {
  from: "light" | "dark";
  to: "light" | "dark";
};

const colors = {
  light: "#ffffff",
  dark: "#0b0a08",
};

export function SectionDivider({ from, to }: SectionDividerProps) {
  return (
    <div aria-hidden="true" className="h-8 w-full sm:h-10">
      <svg
        className="block h-full w-full"
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
      >
        <rect width="1440" height="48" fill={colors[to]} />
        <path
          fill={colors[from]}
          d="M0 0H1440V14 C1429 17 1418 23 1399 22 C1378 21 1371 13 1351 14 C1332 15 1327 25 1308 27 C1291 28 1287 37 1267 39 C1246 36 1253 28 1237 26 C1218 23 1212 15 1194 15 C1174 15 1166 23 1148 23 C1128 22 1117 15 1101 13 C1084 17 1078 23 1059 24 C1040 25 1034 15 1016 15 C999 15 993 24 975 26 C959 28 963 36 945 40 C926 37 930 28 913 26 C896 24 892 15 874 15 C856 15 848 23 830 23 C810 22 800 15 784 13 C768 16 759 23 740 24 C720 25 714 15 696 15 C678 15 672 24 654 26 C638 28 642 36 624 39 C605 36 609 28 592 26 C575 24 571 15 553 15 C535 15 527 23 509 23 C489 22 479 15 463 13 C447 16 438 23 419 24 C399 25 393 15 375 15 C357 15 351 24 333 26 C317 28 321 36 303 40 C284 37 288 28 271 26 C254 24 250 15 232 15 C214 15 206 23 188 23 C168 22 158 15 142 13 C126 16 119 23 100 24 C81 25 75 15 57 15 C39 15 33 24 15 26 C9 27 4 25 0 24V0Z"
        />
      </svg>
    </div>
  );
}
