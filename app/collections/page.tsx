// app/collections/page.tsx
import { getAllCategories, getFilteredDresses, getUniqueFilterValues } from '@/lib/vehicleQueries';
import React from 'react';
import CollectionClient from './collection-client';


const CollectionsPage = async () => {
  // Fetch initial data
  const [categories, filterValues, initialProducts] = await Promise.all([
    getAllCategories(),
    getUniqueFilterValues(),
    getFilteredDresses({})
  ]);

  return (
    <CollectionClient 
      categories={categories || []}
      filterValues={filterValues || { dressTypes: [], sizes: [], occasions: [] }}
      initialProducts={initialProducts || []}
    />
  );
};

export default CollectionsPage;