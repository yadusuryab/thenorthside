// components/Hero.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { getActiveBanners } from '@/lib/vehicleQueries';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';

const Hero = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      const activeBanners = await getActiveBanners();
      if (activeBanners) {
        setBanners(activeBanners);
      }
    };
    fetchBanners();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // If no banners from Sanity, show the original static version
  if (!banners || banners.length === 0) {
    return (
      <div className="relative h-[400px] overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('/hero.avif')" }}
        />
      </div>
    );
  }

  return (
    <div className="relative h-[400px] overflow-hidden">
      {/* Multiple banners with sliding */}
      {banners.map((banner, index) => (
        <div
          key={banner._id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentBanner ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Parallax Background from Sanity */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ 
              backgroundImage: `url('${banner.image?.asset?.url}')` 
            }}
          />

          {/* Text Content from Sanity - Only show if banner has text */}
          {(banner.title || banner.subtitle || banner.buttonText) && (
            <div className={`absolute h-full flex items-center justify-${banner.textPosition || 'center'} container mx-auto px-4`}>
              <div className={`max-w-2xl ${
                banner.textColor === 'light' ? 'text-white' : 'text-gray-900'
              } ${
                banner.textPosition === 'left' ? 'text-left mr-auto' :
                banner.textPosition === 'right' ? 'text-left ml-auto' :
                'text-center'
              }`}>
                {banner.title && (
                  <h1 className="text-xl md:text-5xl font-bold ">
                    {banner.title}
                  </h1>
                )}
                {banner.subtitle && (
                  <p className="text-md md:text-2xl mb-6 opacity-90">
                    {banner.subtitle}
                  </p>
                )}
                {banner.buttonText && banner.buttonLink && (
                  <Link
                    href={banner.buttonLink}
                    className={buttonVariants({variant:'secondary'})}
                  >
                    {banner.buttonText}
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Dots - Only show if multiple banners */}
      {banners.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-4 h-[0.5px] rounded-full transition-all ${
                index === currentBanner 
                  ? 'bg-muted' 
                  : 'bg-gray-700'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;