"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { isProductInCart } from "@/lib/cart";
import AddToCartButton from "../cart/cart-buttons/add-to-cart";
import { Button } from "../ui/button";

export interface Product {
  _id: string;
  name: string;
  category: { name: string; slug: string };
  images: { asset: { url: string } }[];
  description: string;
  price: number;
  offerPrice?: number;
  soldOut: boolean;
}

export interface ProductCardProps {
  product: any;
  className?: string;
  noLink?: boolean;
  onClick?: () => void;
}

export default function ProductCard2({
  product,
  className = "",
  noLink = false,
  onClick,
}: ProductCardProps) {
  const { _id, name, images, price, offerPrice, soldOut } = product;
  const [isInCart, setIsInCart] = React.useState(false);

  React.useEffect(() => {
    setIsInCart(isProductInCart(_id));

    const handleCartUpdate = () => {
      setIsInCart(isProductInCart(_id));
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [_id]);

  const cardContent = (
    <motion.div
      onClick={noLink ? onClick : undefined}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`group flex flex-col bg-[#f8f8f8] rounded-none  ${className}`}
      style={{
        cursor: noLink ? "pointer" : "default",
      }}
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-[1/1.1] bg-white  mb-1 overflow-hidden">
        <Image
          src={images[0]?.asset.url || "/placeholder-image.jpg"}
          alt={name || "Product"}
          width={400}
          height={440}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02] ${
            soldOut ? "grayscale opacity-50" : ""
          }`}
        />
        
        {/* Sold Out Overlay */}
        {soldOut && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
            <span className="font-sans uppercase tracking-widest text-xs text-gray-900 font-medium">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col  flex-grow">
        {/* Product Name */}
        <h3 className="font-sans uppercase tracking-wide text-xs text-gray-900 font-normal leading-tight ">
          {name || "Product Name"}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          {offerPrice && offerPrice < price ? (
            <>
              <span className="font-sans text-xs text-gray-400 font-medium">
                ₹{offerPrice.toLocaleString()}
              </span>
              <span className="font-sans text-xs text-gray-400 line-through font-medium">
                ₹{price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="font-sans text-xs text-gray-400 font-medium">
              ₹{price.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Add to Cart Button - Minimal */}
      {/* <div className="mt-4">
        {!soldOut ? (
          <AddToCartButton 
            product={product}
            className="w-full font-sans uppercase tracking-widest text-xs py-3 bg-transparent border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-none"
          />
        ) : (
          <Button
            className="w-full font-sans uppercase tracking-widest text-xs py-3 bg-transparent border border-gray-300 text-gray-400 rounded-none cursor-not-allowed"
            disabled
          >
            Sold Out
          </Button>
        )}
      </div> */}
    </motion.div>
  );

  return noLink ? cardContent : <Link href={`/p/${_id}`}>{cardContent}</Link>;
}