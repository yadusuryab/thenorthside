"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { urlFor } from "@/sanityClient";

const ProductCarousel = ({
  images,
  productName,
}: {
  images: any[];
  productName: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!carouselApi) return;

    const handleSelect = () => setActiveIndex(carouselApi.selectedScrollSnap());

    carouselApi.on("select", handleSelect);

    return () => {
      carouselApi.off("select", handleSelect);
    };
  }, [carouselApi]);

  const handleThumbnailClick = (index: number) => {
    if (!carouselApi) return;
    carouselApi.scrollTo(index);
    setActiveIndex(index);
  };

  return (
    <div className="w-full">
      {/* Main Carousel with Peek Effect */}
      <Carousel 
        className="w-full relative" 
        setApi={setCarouselApi}
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-6">
          {images.length > 0 ? (
            images.map((image, index) => (
              <CarouselItem 
                key={index}
                className="pl-2 md:pl-6 basis-10/12 md:basis-8/12 lg:basis-7/12 xl:basis-6/12" 
                // Mobile: 10% peek (basis-10/12 = 83.33% width)
                // Desktop: 16.67% peek (basis-8/12 = 66.67% width)
                // Large: 25% peek (basis-7/12 = 58.33% width)
                // XL: 33.33% peek (basis-6/12 = 50% width)
              >
                <div className="relative aspect-[3/4] bg-[#f4f4f4] rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(image.asset.url).url()}
                    alt={`${productName} - View ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 83vw, (max-width: 1024px) 66vw, (max-width: 1280px) 58vw, 50vw"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  
                  {/* Clickable overlay for the peek portion */}
                  {index !== activeIndex && (
                    <div 
                      className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 cursor-pointer z-10"
                      onClick={() => handleThumbnailClick(index)}
                    />
                  )}
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem className="pl-2 md:pl-6 basis-10/12 md:basis-8/12 lg:basis-7/12 xl:basis-6/12">
              <div className="relative aspect-[3/4] bg-[#f4f4f4] rounded-lg overflow-hidden">
                <Image
                  src="/default-product.jpg"
                  alt="Default Product"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 83vw, (max-width: 1024px) 66vw, (max-width: 1280px) 58vw, 50vw"
                />
              </div>
            </CarouselItem>
          )}
        </CarouselContent>

        {/* Hide default navigation arrows since we have peek interaction */}
        <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" />
      </Carousel>

      {/* Enhanced Thumbnail Indicators with active state */}
      {images.length > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6 md:mt-8">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`
                relative transition-all duration-300 ease-out
                ${activeIndex === index 
                  ? "w-8 h-2 bg-[#111111] rounded-full md:w-10 md:h-2" 
                  : "w-2 h-2 bg-[#cccccc] rounded-full hover:bg-[#999999] hover:scale-110 md:w-3 md:h-3"
                }
              `}
              aria-label={`Go to image ${index + 1}`}
              aria-current={activeIndex === index ? "true" : "false"}
            >
              {/* Active state tooltip */}
              {activeIndex === index && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#111111] text-white text-xs px-2 py-1 rounded-md whitespace-nowrap md:text-sm">
                  Image {index + 1}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="text-center mt-4 md:mt-6">
          <span className="text-sm text-gray-600 font-medium md:text-base">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;