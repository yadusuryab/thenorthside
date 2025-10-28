import type { Metadata } from "next";
import localFont from "next/font/local";
// import OGImage from '@/public/og.png'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site-config";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Script from "next/script";

const inter = localFont({
  src: [
    {
      path: "../public/HelveticaNeueRoman.otf",
      weight: "normal",
      style: "normal",
    },
  
  ],
});
export const metadata: Metadata = {
  title: `${site.name} | Premium Streetwear & Urban Fashion`,
  description: "THE NORTH SIDE - Premium streetwear collection featuring limited edition t-shirts, hoodies, and urban fashion. Express your style with our exclusive designs and high-quality apparel. #WEARENORTHSIDE",
  keywords: [
    "north side",
    "streetwear",
    "urban fashion",
    "premium t-shirts",
    "limited edition apparel",
    "hoodies",
    "urban clothing",
    "fashion brand",
    "street style",
    "quality apparel",
    "exclusive designs",
    "#WEARENORTHSIDE",
  ],
  openGraph: {
    title: `${site.name} | Premium Streetwear & Urban Fashion`,
    description: "THE NORTH SIDE - Premium streetwear collection featuring limited edition t-shirts, hoodies, and urban fashion. Express your style with our exclusive designs and high-quality apparel.",
    url: "https://thenorthside.com", // Replace with your actual website URL
    siteName: site.name,
    images: [
      {
        url: '/og-image.jpg', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "THE NORTH SIDE - Premium Streetwear Brand",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Premium Streetwear & Urban Fashion`,
    description: "THE NORTH SIDE - Premium streetwear collection featuring limited edition t-shirts, hoodies, and urban fashion. Express your style with our exclusive designs.",
    images: ['/twitter-image.jpg'], // Replace with your actual Twitter card image URL
    creator: "@thenorthside", // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://thenorthside.com", // Replace with your actual canonical URL
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon.png",
      },
      {
        rel: "android-chrome",
        sizes: "192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome",
        sizes: "512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#000000",
  category: "fashion",
  
  // Additional metadata for better SEO
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Viewport optimization (this should be in your layout, but including for reference)
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};


// JSON-LD Structured Data for Products
export const jsonLdProducts = {
  "@context": "https://schema.org/",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "Product",
      "position": 1,
      "name": "Men's Watches",
      "description": "Explore our collection of stylish and durable men's watches. Perfect for every occasion.",
      "url": "https://groovex.co.in/mens-watches",
      "image": "https://groovex.co.in/images/mens-watches.jpg",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "1999",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "groovex"
        }
      }
    },
    {
      "@type": "Product",
      "position": 2,
      "name": "Ladies' Watches",
      "description": "Discover elegant and trendy ladies' watches to complement your style.",
      "url": "https://groovex.co.in/ladies-watches",
      "image": "https://groovex.co.in/images/ladies-watches.jpg",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "1799",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "groovex"
        }
      }
    },
    {
      "@type": "Product",
      "position": 3,
      "name": "Sunglasses",
      "description": "Shop the latest collection of sunglasses for men and women. UV protection and stylish designs.",
      "url": "https://groovex.co.in/sunglasses",
      "image": "https://groovex.co.in/images/sunglasses.jpg",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "999",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "groovex"
        }
      }
    },
    {
      "@type": "Product",
      "position": 4,
      "name": "Gadgets",
      "description": "Find the latest gadgets, including smartwatches, earphones, and more.",
      "url": "https://groovex.co.in/gadgets",
      "image": "https://groovex.co.in/images/gadgets.jpg",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "4999",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "groovex"
        }
      }
    }
  ]
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
<head>
        <script type="application/ld+json">
          {JSON.stringify(jsonLdProducts)}
        </script>
       
      </head>
      <body className={`${inter.className} antialiased`}>
        
          <Header />
          <div className="min-h-screen ">{children}</div>
          <Footer />
          <Toaster />
          
      </body>
    </html>
  );
}
