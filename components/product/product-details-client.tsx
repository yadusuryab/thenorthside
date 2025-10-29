"use client";

import { useState } from "react";
import { MessageCircle, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site-config";

import SizeSelector from "@/components/product/size-selector";
import AddToCartButton from "@/components/cart/cart-buttons/add-to-cart";
import ProductAccordion from "@/components/product/product-accordion";

interface ProductDetailsClientProps {
  product: any;
  params: { id: string };
}

export default function ProductDetailsClient({ product, params }: ProductDetailsClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const {
    name,
    category,
    fabric,
    careInstructions,
    dressType,
    sizes,
    length,
    neckline,
    sleeveType,
    sleeveLength,
    description,
    price,
    offerPrice,
    soldOut,
    occasion,
    sizeChart, // Added sizeChart from product
  } = product;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const message = `Hi, I am interested in the ${name}.
  - Price: ₹${offerPrice ? offerPrice.toLocaleString() : price?.toLocaleString() || "N/A"}
  - Category: ${category?.name || "N/A"}
  
  Check it out here: ${baseUrl}/p/${params.id}`;

  // Prepare accordion data
  const accordionItems = [
    {
      title: "DESCRIPTION",
      content: description || "No description available.",
    },
    {
      title: "DETAILS",
      content: `
        • Fabric: ${fabric || "Not specified"}
        • Dress Type: ${dressType || "Not specified"}
        • Length: ${length || "Not specified"}
        • Neckline: ${neckline || "Not specified"}
        • Sleeve Type: ${sleeveType || "Not specified"}
        ${sleeveLength ? `• Sleeve Length: ${sleeveLength}` : ""}
        ${careInstructions ? `• Care: ${careInstructions}` : ""}
        ${occasion?.length ? `• Occasion: ${occasion.join(", ")}` : ""}
      `.trim(),
    },
    {
      title: "SHIPPING & RETURNS",
      content: "Read our terms and conditions before purchase of a product.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Product Title */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-medium uppercase tracking-tight text-[#111111]">
          {name || site.name}
        </h1>
        
        {/* Price */}
        <div className="pt-2">
          {offerPrice ? (
            <div className="flex items-center gap-3">
              <p className="text-xl font-light text-[#111111]">
                ₹{new Intl.NumberFormat("en-IN").format(offerPrice)}
              </p>
              {price && (
                <>
                  <p className="text-lg font-light text-[#666666] line-through">
                    ₹{new Intl.NumberFormat("en-IN").format(price)}
                  </p>
                  <span className="text-sm font-light text-[#666666]">
                    {price > 0
                      ? Math.round(((price - offerPrice) / price) * 100)
                      : 0}
                    % OFF
                  </span>
                </>
              )}
            </div>
          ) : (
            price && (
              <p className="text-xl font-light text-[#111111]">
                ₹{new Intl.NumberFormat("en-IN").format(price)}
              </p>
            )
          )}
        </div>
      </div>

      {/* Size Selector - Pass sizeChart data */}
      <SizeSelector 
        sizes={sizes || []} 
        selectedSize={selectedSize}
        onSizeSelect={setSelectedSize}
        sizeChartData={sizeChart} // Pass the sizeChart from Sanity
      />

      {/* Action Buttons */}
      <div className="space-y-3">
        <Link
          href={`${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent(message)}`}
          target="_blank"
          className="block"
        >
          <Button 
          className="w-full"
            size="lg"
          >
            <MessageCircle className="w-4 h-4 mr-2" /> 
            Message via WhatsApp
          </Button>
        </Link>

        <div className="grid grid-cols-2 gap-3">
          <Link href={`tel:${site.phone}`} className="block">
            <Button 
              className="w-full rounded-md border border-[#111111] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-300 uppercase tracking-wide font-light py-6 text-sm"
              size="lg"
              variant="outline"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              Phone
            </Button>
          </Link>

          {soldOut ? (
            <Button 
              className="w-full rounded-md border border-[#cccccc] text-[#666666] uppercase tracking-wide font-light py-6 text-sm"
              size="lg"
              variant="outline"
              disabled
            >
              Sold Out
            </Button>
          ) : (
            <AddToCartButton product={product} selectedSize={selectedSize} />
          )}
        </div>
      </div>

      {/* Product Details Accordion */}
      <ProductAccordion items={accordionItems} />
    </div>
  );
}