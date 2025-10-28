"use client";

import React, { useEffect, useRef, useState } from "react";
import Brand from "../brand/brand";

function Splash() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleAnimationEnd = () => {
      // Wait a bit more for the full effect, then fade out
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setShouldRender(false), 500);
      }, 1000);
    };

    // Listen for animation end on the main container
    container.addEventListener('animationend', handleAnimationEnd);

    // Fallback timeout in case animationend doesn't fire
    const fallbackTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 500);
    }, 4000);

    return () => {
      container.removeEventListener('animationend', handleAnimationEnd);
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999] transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 animate-gradient-shift" />
      
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/5" />
      
      {/* Main Brand Container */}
      <div className="relative flex flex-col items-center justify-center space-y-8">
        {/* Enhanced Brand with Animation */}
        <div className="transform transition-all duration-1000 ease-out animate-brand-enter">
          <Brand />
        </div>
        
        {/* Subtle Loading Indicator */}
        <div className="flex flex-col items-center space-y-4">
          {/* Minimal Loading Bar */}
          <div className="w-32 h-0.5 bg-gray-200 overflow-hidden rounded-full">
            <div className="h-full bg-black animate-loading-bar rounded-full" />
          </div>
          
          {/* Premium Tagline */}
          <p className="text-xs font-light tracking-widest text-gray-500 uppercase animate-fade-in-delay">
            Premium Streetwear
          </p>
        </div>
      </div>
      
      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gray-200 animate-corner-fade" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-gray-200 animate-corner-fade" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-gray-200 animate-corner-fade" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gray-200 animate-corner-fade" />
      
      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }
        
        @keyframes brand-enter {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes fade-in-delay {
          0% {
            opacity: 0;
          }
          70% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        @keyframes corner-fade {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 4s ease-in-out infinite;
        }
        
        .animate-brand-enter {
          animation: brand-enter 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 2s ease-in-out forwards;
        }
        
        .animate-corner-fade {
          animation: corner-fade 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Splash;