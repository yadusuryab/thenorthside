import React from "react";
import { Inter, Luxurious_Script } from 'next/font/google';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Configure Luxurious Script font
const luxuriousScript = Luxurious_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-luxurious-script',
})

interface BrandProps {
  small?: boolean;
  className?: string;
  cal?: boolean;
}

const Brand: React.FC<BrandProps> = ({ small = false, className = "", cal = false }) => {
  if (cal) {
    // Use Luxurious Script font
    return (
      <div className={className}>
        <h2 
          className={`${small ? 'text-xl' : 'text-5xl'} font-normal  tracking-wider ${luxuriousScript.className}`}
        >
          The NorthSide
        </h2>
      </div>
    );
  }

  // Use Inter font (default)
  return (
    <div className={className}>
      <h2 
        className={`uppercase  ${small ? 'text-lg' : 'text-md'} tracking-tight `}
      >
        {process.env.NEXT_PUBLIC_APP_NAME || "THE NORTH SIDE"}
      </h2>
    </div>
  );
};

export default Brand;