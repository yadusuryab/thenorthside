"use client";
import React, { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { site } from "@/lib/site-config";
import { getDressesPaginated, searchDresses, getAllCategories } from "@/lib/vehicleQueries";
import Loading from "@/components/utils/loading";
import ProductCard2 from "@/components/product/product-image-card";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const LIMIT = 12;

// Filter types based on your schema
interface FilterState {
  categories: string[];
  dressTypes: string[];
  sizes: string[];
  occasions: string[];
  priceRange: { min: number; max: number };
  fabrics: string[];
  lengths: string[];
  necklines: string[];
  sleeveTypes: string[];
}

function ProductList() {
  const [items, setItems] = useState<any[]>([]);
  const [view, setView] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const categorySlug = searchParams.get("category") || undefined;

  // Filter state
  const [filters, setFilters] = useState<any>({
    categories: [],
    dressTypes: [],
    sizes: [],
    occasions: [],
    priceRange: { min: 0, max: 50000 },
    fabrics: [],
    lengths: [],
    necklines: [],
    sleeveTypes: [],
  });

  // Available filter options (you can fetch these from your API or define statically)
  const filterOptions = {
    dressTypes: [
      "a-line", "bodycon", "maxi", "midi", "mini", "shift", "wrap", 
      "ball-gown", "sheath", "fit-flare"
    ],
    sizes: [
      "xs", "s", "m", "l", "xl", "xxl", "0", "2", "4", "6", "8", "10", "12", "14", "16"
    ],
    occasions: [
      "casual", "formal", "wedding", "party", "office", "cocktail", "beach", "vacation"
    ],
    lengths: [
      "mini", "knee-length", "tea-length", "midi", "maxi", "ankle-length"
    ],
    necklines: [
      "v-neck", "round-neck", "square-neck", "sweetheart", "halter", "boat-neck", "off-shoulder", "high-neck"
    ],
    sleeveTypes: [
      "sleeveless", "short-sleeves", "three-quarter-sleeves", "long-sleeves", "cap-sleeves", "bell-sleeves", "puff-sleeves"
    ]
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getAllCategories();
        setCategories(cats || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Apply filters to items
  const applyFilters = useCallback((itemsToFilter: any[]) => {
    return itemsToFilter.filter(item => {
      // Category filter
      if (filters.categories.length > 0 && item.category?.slug?.current) {
        if (!filters.categories.includes(item.category.slug.current)) return false;
      }

      // Dress type filter
      if (filters.dressTypes.length > 0 && item.dressType) {
        if (!filters.dressTypes.includes(item.dressType)) return false;
      }

      // Size filter
      if (filters.sizes.length > 0 && item.sizes) {
        const hasSize = filters.sizes.some((size: any) => item.sizes.includes(size));
        if (!hasSize) return false;
      }

      // Occasion filter
      if (filters.occasions.length > 0 && item.occasion) {
        const hasOccasion = filters.occasions.some((occasion: any) => item.occasion.includes(occasion));
        if (!hasOccasion) return false;
      }

      // Price filter
      const price = item.offerPrice || item.price;
      if (price) {
        if (price < filters.priceRange.min || price > filters.priceRange.max) return false;
      }

      // Fabric filter
      if (filters.fabrics.length > 0 && item.fabric) {
        if (!filters.fabrics.includes(item.fabric)) return false;
      }

      // Length filter
      if (filters.lengths.length > 0 && item.length) {
        if (!filters.lengths.includes(item.length)) return false;
      }

      // Neckline filter
      if (filters.necklines.length > 0 && item.neckline) {
        if (!filters.necklines.includes(item.neckline)) return false;
      }

      // Sleeve type filter
      if (filters.sleeveTypes.length > 0 && item.sleeveType) {
        if (!filters.sleeveTypes.includes(item.sleeveType)) return false;
      }

      return true;
    });
  }, [filters]);

  // Initial + category change
  const initFetch = useCallback(async () => {
    try {
      setLoading(true);
      setPage(1);
      setHasMore(true);
      setItems([]);
      setView([]);

      const data = (await getDressesPaginated(1, LIMIT, categorySlug)) || [];
      setItems(data);
      setView(applyFilters(data));
      setHasMore(data.length === LIMIT);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }, [categorySlug, applyFilters]);

  useEffect(() => {
    window.scrollTo(0, 0);
    initFetch();
  }, [initFetch]);

  // Search
  useEffect(() => {
    const run = async () => {
      if (!searchTerm) {
        setView(applyFilters(items));
        setHasMore(true);
        return;
      }
      setSearchLoading(true);
      try {
        const res = (await searchDresses(searchTerm)) || [];
        setView(applyFilters(res));
        setHasMore(false);
      } catch (e) {
        console.error("Error searching:", e);
      } finally {
        setSearchLoading(false);
      }
    };
    run();
  }, [searchTerm, items, applyFilters]);

  // Load more
  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore || !!searchTerm) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const next = (await getDressesPaginated(nextPage, LIMIT, categorySlug)) || [];
      if (next.length > 0) {
        const newItems = [...items, ...next];
        setItems(newItems);
        setView(applyFilters(newItems));
        setPage(nextPage);
        setHasMore(next.length === LIMIT);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.error("Error loading more:", e);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, searchTerm, page, categorySlug, items, applyFilters]);

  // Observer
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      {
        threshold: 0,
        rootMargin: "400px 0px"
      }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  // Filter handlers
  const updateFilter = (filterType: keyof FilterState, value: any) => {
    setFilters((prev:any) => ({
      ...prev,
      [filterType]: value
    }));
  };

  const toggleArrayFilter = (filterType: any, item: any) => {
    setFilters((prev:any) => ({
      ...prev,
      [filterType]: prev[filterType].includes(item)
        ? prev[filterType].filter((i :any) => i !== item)
        : [...prev[filterType], item]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      dressTypes: [],
      sizes: [],
      occasions: [],
      priceRange: { min: 0, max: 50000 },
      fabrics: [],
      lengths: [],
      necklines: [],
      sleeveTypes: [],
    });
  };

  const getActiveFilterCount = () => {
    return (
      filters.categories.length +
      filters.dressTypes.length +
      filters.sizes.length +
      filters.occasions.length +
      (filters.priceRange.min > 0 || filters.priceRange.max < 50000 ? 1 : 0) +
      filters.fabrics.length +
      filters.lengths.length +
      filters.necklines.length +
      filters.sleeveTypes.length
    );
  };

  if (loading) return <Loading />;
  if (error) {
    toast(error);
    return null;
  }

  return (
    <div className="md:mx-28 mx-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6">
        <div>
          {searchTerm && (
            <h2 className="text-2xl font-bold">Search results for "{searchTerm}"</h2>
          )}
          {categorySlug && (
            <h2 className="text-2xl font-bold capitalize">
              {categories.find(cat => cat.slug.current === categorySlug)?.name || "Category"}
            </h2>
          )}
          {!searchTerm && !categorySlug && (
            <h2 className="text-2xl font-bold">All Dresses</h2>
          )}
          <p className="text-muted-foreground mt-1">
            {view.length} {view.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {/* Filter Button */}
        <Sheet open={showFilters} onOpenChange={setShowFilters}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {getActiveFilterCount() > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                <span>Filters</span>
                {getActiveFilterCount() > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                    Clear all
                  </Button>
                )}
              </SheetTitle>
            </SheetHeader>
            
            <ScrollArea className="h-full pb-20">
              <div className="space-y-6 mt-4">
                {/* Categories */}
                <FilterSection title="Categories">
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category._id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category.slug.current)}
                          onChange={() => toggleArrayFilter('categories', category.slug.current)}
                          className="rounded border-gray-300"
                        />
                        <span className="capitalize">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Dress Types */}
                <FilterSection title="Dress Types">
                  <div className="grid grid-cols-1 gap-2">
                    {filterOptions.dressTypes.map(type => (
                      <label key={type} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.dressTypes.includes(type)}
                          onChange={() => toggleArrayFilter('dressTypes', type)}
                          className="rounded border-gray-300"
                        />
                        <span className="capitalize">{type.replace('-', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Sizes */}
                <FilterSection title="Sizes">
                  <div className="grid grid-cols-3 gap-2">
                    {filterOptions.sizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleArrayFilter('sizes', size)}
                        className={`p-2 border rounded text-sm capitalize transition-colors ${
                          filters.sizes.includes(size)
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-gray-300 hover:border-black'
                        }`}
                      >
                        {size.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Price Range */}
                <FilterSection title="Price Range">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <label className="text-sm text-muted-foreground">Min</label>
                        <input
                          type="number"
                          value={filters.priceRange.min}
                          onChange={(e) => updateFilter('priceRange', {
                            ...filters.priceRange,
                            min: Number(e.target.value)
                          })}
                          className="w-full p-2 border rounded"
                          placeholder="0"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-sm text-muted-foreground">Max</label>
                        <input
                          type="number"
                          value={filters.priceRange.max}
                          onChange={(e) => updateFilter('priceRange', {
                            ...filters.priceRange,
                            max: Number(e.target.value)
                          })}
                          className="w-full p-2 border rounded"
                          placeholder="50000"
                        />
                      </div>
                    </div>
                  </div>
                </FilterSection>

                {/* Occasions */}
                <FilterSection title="Occasions">
                  <div className="grid grid-cols-2 gap-2">
                    {filterOptions.occasions.map(occasion => (
                      <label key={occasion} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.occasions.includes(occasion)}
                          onChange={() => toggleArrayFilter('occasions', occasion)}
                          className="rounded border-gray-300"
                        />
                        <span className="capitalize text-sm">{occasion}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Additional filters can be added here */}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.categories.map((category: React.Key | null | undefined) => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              {categories.find(cat => cat.slug.current === category)?.name}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => toggleArrayFilter('categories', category)}
              />
            </Badge>
          ))}
          {filters.dressTypes.map((type: any) => (
            <Badge key={type} variant="secondary" className="flex items-center gap-1">
              {type.replace('-', ' ')}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => toggleArrayFilter('dressTypes', type)}
              />
            </Badge>
          ))}
          {/* Add more active filter badges as needed */}
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
            Clear all
          </Button>
        </div>
      )}

      {/* Products Grid */}
      {!searchLoading && view.length === 0 ? (
        <div className="flex flex-col justify-center max-w-96 mx-auto space-y-4 mt-12">
          <p className="text-center text-lg text-muted-foreground font-bold">
            No products found matching your filters.
          </p>
          <Button variant="outline" onClick={clearAllFilters}>
            Clear filters
          </Button>
          <Link href={`${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent("Hi, I'm looking for a dress but couldn't find it on your website.")}`} target="_blank">
            <Button className="w-full bg-green-500 text-white hover:bg-green-600">
              Chat via WhatsApp for help
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 mt-6">
            {view.map((p) => (
              <ProductCard2 key={p._id} product={p} />
            ))}
          </div>

          {hasMore && (
            <div ref={loaderRef} className="flex justify-center py-8">
              {loadingMore ? <Loading /> : null}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Filter Section Component
const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border-b pb-4">
    <h3 className="font-semibold mb-3">{title}</h3>
    {children}
  </div>
);

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductList />
    </Suspense>
  );
}