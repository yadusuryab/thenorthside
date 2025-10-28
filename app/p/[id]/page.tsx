import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { urlFor } from "@/sanityClient";
import { site } from "@/lib/site-config";

import { getDressById } from "@/lib/vehicleQueries";
import ProductCarousel from "@/components/product/product-carousel";
import ProductDetailsClient from "@/components/product/product-details-client";

interface ProductProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductProps): Promise<Metadata> {
  const resp = await params;
  const product = await getDressById(resp.id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  const { name, price, images } = product;
  const ogImage = images?.[0] ? urlFor(images[0]).url() : "/default-og.jpg";
  const ogDescription = `Check out the ${name} priced at ₹${price?.toLocaleString() || "N/A"}. Available now!`;

  return {
    title: `${name} - Product Details`,
    description: ogDescription,
    openGraph: {
      title: `${name} - Product Details`,
      description: ogDescription,
      images: [{ url: ogImage, alt: name, width: 1200, height: 630 }],
    },
  };
}

export default async function ProductPage({ params }: ProductProps) {
  const resp = await params;
  const product = await getDressById(resp.id);

  if (!product) return notFound();

  const { name, category, images } = product;

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Breadcrumbs */}
      <div className="border-b border-[#e0e0e0]">
        <div className="container mx-auto px-4 md:px-20 lg:px-32 py-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[#666666]">
            <Link href="/" className="hover:text-[#111111] transition-colors">SHOP</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-[#111111] transition-colors">DRESSES</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#111111]">{category?.name || "PRODUCT"}</span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container pl-2 mx-auto ">
  <div className="lg:flex w-full justify-between  ">
    {/* Product Carousel - Takes 2/3 of space */}
    <div className="h-full flex-2 min-h-[60vh]">
      <ProductCarousel images={images || []} productName={name || site.name} />
    </div>

    {/* Product Details - Takes 1/3 of space */}
    <div className="px-4 flex-1">
      <ProductDetailsClient product={product} params={resp} />
    </div>
  </div>
</div>
    </div>
  );
}