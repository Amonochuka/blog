"use client";

import Image from "next/image";
import { useState } from "react";

type PhotoStackProps = {
  photos: [string, string, string, string];
  alt: string;
};

const printPositions = [
  { left: "4%", top: "12%", rotate: "-8deg" },
  { left: "3%", top: "18%", rotate: "7deg" },
  { left: "17%", top: "4%", rotate: "-3deg" },
  { left: "10%", top: "8%", rotate: "1.5deg" },
];

export function PhotoStack({ photos, alt }: PhotoStackProps) {
  const [activeIndex, setActiveIndex] = useState(photos.length - 1);

  return (
    <div className="mx-auto w-full max-w-xl">
      <div
        className="relative h-[19rem] w-full sm:h-[23rem] lg:h-[26rem]"
        role="group"
        aria-label="Photo stack. Hover to browse photos, or select one to bring it forward."
      >
        {photos.map((src, index) => {
          const active = index === activeIndex;
          const position = printPositions[index];
          return (
            <button
              key={src}
              type="button"
              aria-label={`Show photo ${index + 1} of ${photos.length}`}
              aria-pressed={active}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              className="absolute rounded-sm bg-white p-2 pb-8 text-left shadow-xl outline-offset-4 transition-[left,top,width,transform,box-shadow] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-brand-gold motion-reduce:transition-none sm:p-3 sm:pb-10"
              style={{
                left: active ? "10%" : position.left,
                top: active ? "7%" : position.top,
                width: active ? "78%" : "66%",
                zIndex: active ? 20 : index + 1,
                transform: `rotate(${active ? "0deg" : position.rotate}) scale(${active ? 1.025 : 0.97})`,
              }}
            >
              <Image
                src={src}
                alt={active ? alt : ""}
                aria-hidden={!active}
                className="aspect-[4/3] w-full rounded-[2px] object-cover object-[center_20%]"
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 40vw, 82vw"
                loading="lazy"
              />
              <span className="absolute inset-x-3 bottom-2 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-black sm:bottom-3 sm:text-xs">
                {index + 1} / {photos.length}
              </span>
            </button>
          );
        })}
        <span className="sr-only" aria-live="polite">Showing photo {activeIndex + 1} of {photos.length}.</span>
      </div>
    </div>
  );
}
