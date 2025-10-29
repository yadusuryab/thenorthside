"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import Splash from "../utils/splash";
import ProductCard2 from "./product-image-card";
import { getDressesPaginated } from "@/lib/vehicleQueries";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import SearchBar from "../utils/search-box";

function ProductHomeGrid() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isFetching = useRef<boolean>(false);

  const fetchVehicles = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);

    try {
      const data: any = await getDressesPaginated(1, 6, ""); // Fixed to 6 products only
      if (!data || !Array.isArray(data))
        throw new Error("Invalid product data");

      setVehicles(data);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error(err);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  useEffect(() => {
    if (error) toast(error);
  }, [error]);

  if (loading) return <Splash />;

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-sans text-sm text-gray-600 uppercase tracking-wide">
          No Products Found
        </p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-1">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div className="flex justify-between w-full items-center">
            <h2 className="font-sans text-xs uppercase tracking-widest">
              LATEST DROP
            </h2>
            <SearchBar cat={true} />
          </div>
        </div>

        {/* Product Grid - Only 6 products */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
          {vehicles.slice(0, 6).map((product) => (
            <ProductCard2 
              key={product._id} 
              product={product}
              className="group"
            />
          ))}
        </div>

        {/* View All Collections Button */}
        <div className="flex justify-center mt-12">
          <Link href="/products">
            <Button 
              variant="outline" 
              className="font-sans uppercase tracking-widest text-xs border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-none px-8 py-3"
            >
              VIEW ALL COLLECTIONS
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductHomeGrid;