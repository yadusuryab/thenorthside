// components/Hero.tsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { getActiveBanners } from '@/lib/vehicleQueries';

const Hero = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

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

  // Handle video loading and playback
  useEffect(() => {
    const currentBannerData = banners[currentBanner];
    if (currentBannerData?.mediaType === 'video' && videoRef.current) {
      const video = videoRef.current;
      video.load();
      video.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, [currentBanner, banners]);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  // If no banners from Sanity, show the original static version
  if (!banners || banners.length === 0) {
    return (
      <div className="relative h-[400px] overflow-hidden">
        {/* Parallax Background */}
        <div 
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero.avif')" }}
        />
      </div>
    );
  }

  const getTextPositionClass = (position: string) => {
    switch (position) {
      case 'left':
        return 'text-left mr-auto';
      case 'right':
        return 'text-left ml-auto';
      default:
        return 'text-center';
    }
  };

  const getJustifyClass = (position: string) => {
    switch (position) {
      case 'left':
        return 'justify-start';
      case 'right':
        return 'justify-end';
      default:
        return 'justify-center';
    }
  };

  return (
    <div className="relative h-[540px] overflow-hidden">
      {/* Multiple banners with sliding */}
      {banners.map((banner, index) => (
        <div
          key={banner._id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentBanner ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Media Background from Sanity */}
          {banner.mediaType === 'video' && banner.video?.asset?.url ? (
            <div className="absolute inset-0 overflow-hidden">
              <video
              
                ref={index === currentBanner ? videoRef   : null}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
                poster={banner.videoPoster?.asset?.url}
                onLoadedData={handleVideoLoad}
                controls={false} // Explicitly disable controls
                disablePictureInPicture
                disableRemotePlayback
              >
                <source src={banner.video.asset.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Fallback image if video fails to load */}
              {!isVideoLoaded && banner.videoPoster?.asset?.url && (
                <div 
                  className="absolute inset-0 bg-fit bg-center"
                  style={{ 
                    backgroundImage: `url('${banner.videoPoster.asset.url}')` 
                  }}
                />
              )}
            </div>
          ) : (
            // Image Banner with Parallax
            <div 
              ref={parallaxRef}
              className="absolute inset-0 bg-fill bg-center bg-repeat"
              style={{ 
                backgroundImage: `url('${banner.image?.asset?.url}')`,
                backgroundAttachment: 'fixed' // Creates parallax effect
              }}
            />
          )}

          {/* Overlay for better text readability */}
          

          {/* Text Content from Sanity - Only show if banner has text */}
          {(banner.title || banner.subtitle || banner.buttonText) && (
            <div className={`absolute inset-0 h-full flex items-center ${getJustifyClass(banner.textPosition || 'center')} container mx-auto px-4`}>
              <div className={`max-w-2xl ${
                banner.textColor === 'light' ? 'text-white' : 'text-gray-900'
              } ${getTextPositionClass(banner.textPosition || 'center')}`}>
                {banner.title && (
                  <h1 className="text-lg md:text-3xl font-bold  drop-shadow-lg">
                    {banner.title}
                  </h1>
                )}
                {banner.subtitle && (
                  <p className="text-sm md:text-xl mb-6 opacity-90 drop-shadow-md">
                    {banner.subtitle}
                  </p>
                )}
                {banner.buttonText && banner.buttonLink && (
                  <Link
                    href={banner.buttonLink}
                    className={buttonVariants({ 
                      variant: banner.textColor === 'light' ? 'secondary' : 'secondary',
                      size: 'lg'
                    })}
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
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-5 h-[0.5] rounded-full transition-all border-2 ${
                index === currentBanner 
                  ? 'bg-white border-white' 
                  : 'bg-transparent border-white/50 hover:border-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Previous/Next buttons for larger screens */}
      {/* {banners.length > 1 && (
        <>
          <button
            onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all hidden md:block"
            aria-label="Previous banner"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all hidden md:block"
            aria-label="Next banner"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )} */}
    </div>
  );
};

export default Hero;