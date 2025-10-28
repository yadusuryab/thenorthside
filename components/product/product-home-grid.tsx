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
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isFetching = useRef<boolean>(false);

  const fetchVehicles = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);

    try {
      const data: any = await getDressesPaginated(page, 8, ""); // Increased to 8 for better grid layout
      if (!data || !Array.isArray(data))
        throw new Error("Invalid product data");

      setVehicles((prev) => [...prev, ...data]);
      setHasMore(data.length === 8);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error(err);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [page]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  useEffect(() => {
    if (error) toast(error);
  }, [error]);

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loading]);

  if (loading && page === 1) return <Splash />;

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
        
            <h2 className="font-sans text-xs uppercase tracking-widest ">
              LATEST DROP
            </h2>
           
          
          <SearchBar cat={true} />
         </div>
          
          {/* <Link href="/products">
            <Button 
              variant="outline" 
              className="font-sans uppercase tracking-widest text-xs border-black text-black hover:bg-black hover:text-white transition-all duration-300 rounded-none px-8 py-3"
            >
              DISCOVER MORE
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link> */}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
          {vehicles.map((product) => (
            <ProductCard2 
              key={product._id} 
              product={product}
              className="group"
            />
          ))}
        </div>

        {/* Loader for infinite scroll */}
        <div ref={loaderRef} className="flex justify-center py-12">
          {loading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
              <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mt-4">
                Loading
              </p>
            </div>
          )}
          {!hasMore && vehicles.length > 0 && (
            <p className="font-sans text-xs uppercase tracking-widest text-gray-400">
              End of Collection
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductHomeGrid;