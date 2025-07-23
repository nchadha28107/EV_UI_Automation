"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: Array<string>;
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef?.current?.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Selected Image Display */}
        <div className="relative h-64 sm:h-96 w-full">
          <Image
            src={selectedImage ? selectedImage : images[0]}
            alt="EV Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Image List Container */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute text-white font-extrabold left-0 top-1/2 -translate-y-1/2 z-10 p-4 bg-black/50 hover:bg-black/75 rounded-full"
            aria-label="Scroll left"
          >
            {`<`}
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 px-10 mx-8 scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {images.map((image, index) => (
              <div
                role="button"
                title="click to view image"
                key={index}
                className={`flex-shrink-0 cursor-pointer transition-all duration-200 `}
              >
                <Image
                  src={image}
                  alt={`car image ${index + 1}`}
                  //   layout="fill"
                  //   objectFit="cover"
                  width={80}
                  height={60}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute text-white font-extrabold right-0 top-1/2 -translate-y-1/2 z-10 p-4 bg-black/50 hover:bg-black/75 rounded-full"
            aria-label="Scroll right"
          >
            {`>`}
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
