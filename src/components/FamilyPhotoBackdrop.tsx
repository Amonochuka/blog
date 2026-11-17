import Image from "next/image";

type FamilyPhotoBackdropProps = {
  firstSrc: string;
  secondSrc: string;
  tone?: "light" | "dark";
  preloadFirst?: boolean;
  firstObjectPosition?: string;
  secondObjectPosition?: string;
  beardEdgeBottom?: boolean;
  fadeFromDarkTop?: boolean;
  fadeToDarkBottom?: boolean;
};

export function FamilyPhotoBackdrop({
  firstSrc,
  secondSrc,
  tone = "light",
  preloadFirst = false,
  firstObjectPosition = "center",
  secondObjectPosition = "center",
  beardEdgeBottom = false,
  fadeFromDarkTop = false,
  fadeToDarkBottom = false,
}: FamilyPhotoBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={`family-photo-backdrop family-photo-backdrop--${tone}${beardEdgeBottom ? " family-photo-backdrop--beard-edge-bottom" : ""}${fadeFromDarkTop ? " family-photo-backdrop--fade-from-dark-top" : ""}${fadeToDarkBottom ? " family-photo-backdrop--fade-to-dark-bottom" : ""}`}
    >
      <Image
        src={firstSrc}
        alt=""
        fill
        sizes="100vw"
        quality={72}
        preload={preloadFirst}
        style={{ objectPosition: firstObjectPosition }}
        className="family-photo-backdrop__image family-photo-backdrop__image--first"
      />
      <Image
        src={secondSrc}
        alt=""
        fill
        sizes="100vw"
        quality={72}
        loading={preloadFirst ? "eager" : "lazy"}
        style={{ objectPosition: secondObjectPosition }}
        className="family-photo-backdrop__image family-photo-backdrop__image--second"
      />
      <div className="family-photo-backdrop__tint" />
    </div>
  );
}
