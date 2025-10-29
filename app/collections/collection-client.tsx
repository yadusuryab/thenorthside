// components/CollectionClient.tsx
'use client';
import ProductCard2 from '@/components/product/product-image-card';
import { getFilteredDresses } from '@/lib/vehicleQueries';
import React, { useState, useEffect } from 'react';

interface CollectionClientProps {
  categories: any[];
  filterValues: {
    dressTypes: string[];
    sizes: string[];
    occasions: string[];
  };
  initialProducts: any[];
}

const CollectionClient: React.FC<CollectionClientProps> = ({
  categories,
  filterValues,
  initialProducts
}) => {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    categorySlug: '',
    dressType: '',
    size: '',
    occasion: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest'
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Apply filters
  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);
      try {
        const filteredProducts = await getFilteredDresses({
          categorySlug: filters.categorySlug || undefined,
          dressType: filters.dressType || undefined,
          size: filters.size || undefined,
          occasion: filters.occasion || undefined,
          minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
          maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
        });
        
        // Apply sorting
        let sortedProducts = [...(filteredProducts || [])];
        switch (filters.sortBy) {
          case 'price-low':
            sortedProducts.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
            break;
          case 'price-high':
            sortedProducts.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
            break;
          case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'newest':
          default:
            sortedProducts.sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime());
            break;
        }
        
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error applying filters:', error);
      } finally {
        setLoading(false);
      }
    };

    applyFilters();
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      categorySlug: '',
      dressType: '',
      size: '',
      occasion: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest'
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== 'newest'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dress Collection</h1>
          <p className="text-gray-600">Discover our curated selection of beautiful dresses</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              {/* Filter Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Category</h3>
                <select
                  value={filters.categorySlug}
                  onChange={(e) => handleFilterChange('categorySlug', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.slug.current}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dress Type Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Dress Type</h3>
                <select
                  value={filters.dressType}
                  onChange={(e) => handleFilterChange('dressType', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Types</option>
                  {filterValues.dressTypes.map((type) => (
                    <option key={type} value={type}>
                      {type?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Size</h3>
                <select
                  value={filters.size}
                  onChange={(e) => handleFilterChange('size', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Sizes</option>
                  {filterValues.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Occasion Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Occasion</h3>
                <select
                  value={filters.occasion}
                  onChange={(e) => handleFilterChange('occasion', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Occasions</option>
                  {filterValues.occasions.map((occasion) => (
                    <option key={occasion} value={occasion}>
                      {occasion.charAt(0).toUpperCase() + occasion.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  {/* Mobile Filters Button */}
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                    Filters
                  </button>

                  <span className="text-gray-600">
                    {products.length} {products.length === 1 ? 'product' : 'products'} found
                  </span>
                </div>

                {/* Sort By */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Sort by:</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* Products Grid */}
            {!loading && (
              <>
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <ProductCard2 key={product._id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or search terms.</p>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <MobileFilters
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        categories={categories}
        filterValues={filterValues}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product }: { product: any }) => {
  const mainImage = product.images?.[0]?.asset?.url || '/placeholder-image.jpg';
  const currentPrice = product.offerPrice || product.price;
  const hasDiscount = product.offerPrice && product.offerPrice < product.price;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.soldOut && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg bg-red-600 px-3 py-1 rounded">
              Sold Out
            </span>
          </div>
        )}
        {product.featured && !product.soldOut && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">{product.name}</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-2 capitalize">
          {product.dressType?.replace('-', ' ')}
        </p>
        
        <div className="flex items-center gap-2 mb-3">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-gray-900">${currentPrice}</span>
              <span className="text-sm text-gray-500 line-through">${product.price}</span>
              <span className="text-xs bg-red-100 text-red-800 px-1 rounded">
                {Math.round((1 - currentPrice / product.price) * 100)}% off
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">${currentPrice}</span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => {/* Add to cart logic */}}
            disabled={product.soldOut}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
              product.soldOut
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {product.soldOut ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Mobile Filters Component
const MobileFilters = ({ 
  isOpen, 
  onClose, 
  categories, 
  filterValues, 
  filters, 
  onFilterChange,
  onClearFilters,
  hasActiveFilters 
}: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white shadow-xl overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={onClose} className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="w-full mb-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
            >
              Clear all filters
            </button>
          )}

          {/* Mobile filter content - same as desktop but stacked */}
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Category</h3>
              <select
                value={filters.categorySlug}
                onChange={(e) => onFilterChange('categorySlug', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Categories</option>
                {categories.map((category: any) => (
                  <option key={category._id} value={category.slug.current}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Add other filters similarly */}
            {/* Dress Type */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Dress Type</h3>
              <select
                value={filters.dressType}
                onChange={(e) => onFilterChange('dressType', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Types</option>
                {filterValues.dressTypes.map((type: string) => (
                  <option key={type} value={type}>
                    {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Size */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Size</h3>
              <select
                value={filters.size}
                onChange={(e) => onFilterChange('size', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Sizes</option>
                {filterValues.sizes.map((size: string) => (
                  <option key={size} value={size}>
                    {size.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Occasion */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Occasion</h3>
              <select
                value={filters.occasion}
                onChange={(e) => onFilterChange('occasion', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">All Occasions</option>
                {filterValues.occasions.map((occasion: string) => (
                  <option key={occasion} value={occasion}>
                    {occasion.charAt(0).toUpperCase() + occasion.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => onFilterChange('minPrice', e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionClient;