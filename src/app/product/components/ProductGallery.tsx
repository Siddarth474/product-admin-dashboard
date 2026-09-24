"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  title: string;
  thumbnail: string;
  images: string[];
}

export default function ProductGallery({
  title,
  thumbnail,
  images,
}: ProductGalleryProps) {
  const galleryImages = images.length > 0 ? images : [thumbnail];

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-xs">
        <Image
          src={selectedImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-6 sm:p-10"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {galleryImages.map((image, index) => {
          const isSelected = selectedImage === image;

          return (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-white transition ${
                isSelected
                  ? "border-black ring-1 ring-black"
                  : "border-zinc-300 hover:border-zinc-500"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${title} ${index + 1}`}
                fill
                sizes="80px"
                className="object-contain p-2"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
