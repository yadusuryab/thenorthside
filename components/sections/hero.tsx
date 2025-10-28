// components/Hero.tsx
import React from 'react';

const Hero = () => {
  return (
    <div className="relative  h-[400px] overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/hero.avif')" }}
      />
    </div>
  );
};

export default Hero;