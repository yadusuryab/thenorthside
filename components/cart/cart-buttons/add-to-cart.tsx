"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

interface AddToCartButtonProps {
  product: {
    _id: string;
    name: string;
    category: {
      name: string;
      slug: string;
    };
    fabric: string;
    dressType: string;
    sizes: string[];
    colors: string[];
    length: string;
    neckline: string;
    sleeveType: string;
    images: { asset: { url: string } }[];
    description: string;
    price: number;
    offerPrice?: number;
  };
  selectedSize?: string | null;
}

export default function AddToCartButton({ product, selectedSize }: AddToCartButtonProps) {
  const [isInCart, setIsInCart] = useState(false);
  const [cartItemId, setCartItemId] = useState<string | null>(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if this product with the selected size is in cart
    const existingItem = cart.find((item: any) => 
      item._id === product._id && item.selectedSize === selectedSize
    );
    
    setIsInCart(!!existingItem);
    setCartItemId(existingItem?._id || null);
  }, [product._id, selectedSize]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!selectedSize) {
      // You can add a toast notification here
      console.warn("Please select a size before adding to cart");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!isInCart) {
      const cartItem = {
        ...product,
        cartItemId: `${product._id}-${selectedSize}`, // Unique ID for cart item
        selectedSize,
        quantity: 1,
        addedAt: new Date().toISOString()
      };

      const updatedCart = [...cart, cartItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setIsInCart(true);
      setCartItemId(cartItem.cartItemId);

      // 🔔 Broadcast event so other components update
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  // If no size is selected, show disabled button
  if (!selectedSize) {
    return (
      <Button
        className="w-full rounded-md border border-[#cccccc] text-[#666666] bg-[#f8f8f8] hover:bg-[#f8f8f8] hover:text-[#666666] uppercase tracking-wide font-light py-6 text-sm cursor-not-allowed"
        size="lg"
        disabled
      >
        <AlertCircle className="w-4 h-4 mr-2" />
        Select Size
      </Button>
    );
  }

  return isInCart ? (
    <Link href="/my-cart" className="w-full block">
      <Button
        className="w-full rounded-md border border-[#111111] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300 uppercase tracking-wide font-light py-6 text-sm"
        size="lg"
        variant="outline"
      >
        <CheckCircle className="w-4 h-4 mr-2" /> 
        Added to Cart
      </Button>
    </Link>
  ) : (
    <Button
      onClick={handleAddToCart}
      className="w-full rounded-md border border-[#111111] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300 uppercase tracking-wide font-light py-6 text-sm"
      size="lg"
      variant="outline"
    >
      <ShoppingBag className="w-4 h-4 mr-2" /> 
      Add to Cart
    </Button>
  );
}