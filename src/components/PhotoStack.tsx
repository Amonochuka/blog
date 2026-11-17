import Image from "next/image";

type PhotoStackProps = {
  photos: [string, string, string, string];
  alt: string;
};

const printPositions = [
  "left-[4%] top-[12%] w-[66%] -rotate-[8deg]",
  "right-[3%] top-[18%] w-[64%] rotate-[7deg]",
  "left-[17%] top-[4%] z-[1] w-[65%] -rotate-[3deg]",
  "left-[10%] top-[8%] z-10 w-[78%] rotate-[1.5deg]",
];

export function PhotoStack({ photos, alt }: PhotoStackProps) {
  return (
    <div className="relative mx-auto h-[19rem] w-full max-w-xl sm:h-[23rem] lg:h-[26rem]">
      {photos.map((src, index) => {
        const isFrontPrint = index === photos.length - 1;

        return (
          <div
            key={src}
            className={`absolute rounded-sm bg-white p-2 pb-8 shadow-xl sm:p-3 sm:pb-10 ${printPositions[index]}`}
          >
            <Image
              src={src}
              alt={isFrontPrint ? alt : ""}
              aria-hidden={!isFrontPrint}
              className="aspect-[4/3] w-full rounded-[2px] object-cover object-[center_20%]"
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 40vw, 82vw"
              loading="lazy"
            />
          </div>
        );
      })}
    </div>
  );
}
