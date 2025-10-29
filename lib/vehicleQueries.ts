import { client } from "@/sanityClient";

// Fetch all products (dresses) with pagination
export async function getDressesPaginated(
  page: number,
  limit: number,
  categorySlug?: string
): Promise<any[]> {
  const start = (page - 1) * limit;
  const end = page * limit;

  const fields = `
    _id,
    name,
    category->{name, slug},
    fabric,
    careInstructions,
    dressType,
    sizes,
    colors,
    length,
    neckline,
    sleeveType,
    images[]{asset->{url}},
    price,
    offerPrice,
    description,
    soldOut,
    featured,
    occasion
  `;

  const base = categorySlug
    ? `*[_type == "product" && defined(category) && category->slug.current == $slug]`
    : `*[_type == "product"]`;

  const query = `${base} | order(soldOut asc, _createdAt desc) [${start}...${end}] {${fields}}`;

  try {
    const products = await client.fetch(query, { slug: categorySlug });
    return Array.isArray(products) ? products : [];
  } catch (e) {
    console.error("Sanity fetch failed:", e);
    return [];
  }
}

// Fetch a single product (dress) by ID
export const getDressById = async (id: string): Promise<any | undefined> => {
  const query = `*[_type == "product" && _id == $id][0] {
    _id,
    name,
    category -> {
      name,
      slug
    },
    fabric,
    careInstructions,
    dressType,
    sizes,
    colors,
    length,
    neckline,
    sleeveType,
    images[] {
      asset -> {
        url
      }
    },
    price,
    offerPrice,
    description,
    soldOut,
    featured,
    occasion
  }`;

  try {
    const product = await client.fetch(query, { id });
    if (!product) {
      console.warn(`No product found for ID: ${id}`);
      return undefined;
    }
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return undefined;
  }
};

// Search for products (dresses) by keyword
export const searchDresses = async (keyword: string): Promise<any[] | undefined> => {
  const query = `*[_type == "product" && (
    name match $keyword || 
    fabric match $keyword || 
    dressType match $keyword || 
    description match $keyword
  )] {
    _id,
    name,
    category -> {
      name,
      slug
    },
    fabric,
    dressType,
    sizes,
    colors,
    length,
    neckline,
    sleeveType,
    images[] {
      asset -> {
        url
      }
    },
    price,
    offerPrice,
    description,
    soldOut,
    featured,
    occasion
  }`;

  try {
    const products = await client.fetch(query, { keyword: `*${keyword}*` });
    return products;
  } catch (error) {
    console.error("Error searching products:", error);
    return undefined;
  }
};

// Fetch featured dresses
export const getFeaturedDresses = async (): Promise<any[] | undefined> => {
  const query = `*[_type == "product" && featured == true && soldOut != true] {
    _id,
    name,
    category -> {
      name,
      slug
    },
    fabric,
    dressType,
    images[] {
      asset -> {
        url
      }
    },
    price,
    offerPrice,
    description,
    soldOut,
    featured
  }`;

  try {
    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return undefined;
  }
};

// Fetch dresses by multiple filters
export const getFilteredDresses = async (filters: {
  categorySlug?: string;
  dressType?: string;
  size?: string;
  occasion?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<any[] | undefined> => {
  let filterConditions = ['_type == "product"', 'soldOut != true'];
  
  if (filters.categorySlug) {
    filterConditions.push('category->slug.current == $categorySlug');
  }
  
  if (filters.dressType) {
    filterConditions.push('dressType == $dressType');
  }
  
  if (filters.size) {
    filterConditions.push('$size in sizes');
  }
  
  if (filters.occasion) {
    filterConditions.push('$occasion in occasion');
  }
  
  if (filters.minPrice !== undefined) {
    filterConditions.push('(offerPrice != null ? offerPrice : price) >= $minPrice');
  }
  
  if (filters.maxPrice !== undefined) {
    filterConditions.push('(offerPrice != null ? offerPrice : price) <= $maxPrice');
  }

  const query = `*[${filterConditions.join(' && ')}] {
    _id,
    name,
    category -> {
      name,
      slug
    },
    fabric,
    dressType,
    sizes,
    colors,
    length,
    neckline,
    sleeveType,
    images[] {
      asset -> {
        url
      }
    },
    price,
    offerPrice,
    description,
    soldOut,
    featured,
    occasion
  } | order(_createdAt desc)`;

  try {
    const products = await client.fetch(query, filters);
    return products;
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return undefined;
  }
};

// Add a product (dress) to the cart
export const addToCart = (product: any) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (!cart.some((item: any) => item._id === product._id)) {
    const updatedCart = [...cart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }
};

// Fetch all categories
export const getAllCategories = async (): Promise<any[] | undefined> => {
  const query = `*[_type == "category"] {
    _id,
    name,
    slug
  }`;

  try {
    const categories = await client.fetch(query);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return undefined;
  }
};

// Fetch products by category slug
export const getProductsByCategory = async (categorySlug: string): Promise<any[] | undefined> => {
  const query = `*[_type == "product" && category->slug.current == $categorySlug && soldOut != true] {
    _id,
    name,
    category -> {
      name,
      slug
    },
    fabric,
    dressType,
    sizes,
    colors,
    length,
    neckline,
    sleeveType,
    images[] {
      asset -> {
        url
      }
    },
    price,
    offerPrice,
    description,
    soldOut,
    featured,
    occasion
  } | order(_createdAt desc)`;

  try {
    const products = await client.fetch(query, { categorySlug });
    return products;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return undefined;
  }
};

// Get unique values for filters
export const getUniqueFilterValues = async (): Promise<{
  dressTypes: string[];
  sizes: string[];
  occasions: string[];
} | undefined> => {
  const query = `{
    "dressTypes": array::unique(*[_type == "product"].dressType),
    "sizes": array::unique(*[_type == "product"].sizes[]),
    "occasions": array::unique(*[_type == "product"].occasion[])
  }`;

  try {
    const filterValues = await client.fetch(query);
    return filterValues;
  } catch (error) {
    console.error("Error fetching filter values:", error);
    return undefined;
  }
};

// Get related products (same category)
export const getRelatedDresses = async (productId: string, categorySlug: string, limit: number = 4): Promise<any[] | undefined> => {
  const query = `*[_type == "product" && category->slug.current == $categorySlug && _id != $productId && soldOut != true][0...$limit] {
    _id,
    name,
    category -> {
      name,
      slug
    },
    fabric,
    dressType,
    images[] {
      asset -> {
        url
      }
    },
    price,
    offerPrice,
    description,
    soldOut
  }`;

  try {
    const products = await client.fetch(query, { productId, categorySlug, limit });
    return products;
  } catch (error) {
    console.error("Error fetching related products:", error);
    return undefined;
  }
};

// Add these to your existing queries file

// Fetch active banners
export const getActiveBanners = async (): Promise<any[] | undefined> => {
  const query = `*[_type == "banner" && active == true && (
    !defined(startDate) || startDate <= now()
  ) && (
    !defined(endDate) || endDate >= now()
  )] | order(order asc) {
    _id,
    title,
    subtitle,
    image {
      asset -> {
        url,
        metadata {
          dimensions
        }
      }
    },
    buttonText,
    buttonLink,
    textPosition,
    textColor,
    active,
    order,
    startDate,
    endDate
  }`;

  try {
    const banners = await client.fetch(query);
    return banners;
  } catch (error) {
    console.error("Error fetching banners:", error);
    return undefined;
  }
};

// Fetch all banners (for admin purposes)
export const getAllBanners = async (): Promise<any[] | undefined> => {
  const query = `*[_type == "banner"] | order(order asc) {
    _id,
    title,
    subtitle,
    image {
      asset -> {
        url,
        metadata {
          dimensions
        }
      }
    },
    buttonText,
    buttonLink,
    textPosition,
    textColor,
    active,
    order,
    startDate,
    endDate
  }`;

  try {
    const banners = await client.fetch(query);
    return banners;
  } catch (error) {
    console.error("Error fetching all banners:", error);
    return undefined;
  }
};