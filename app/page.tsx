import CategoryGrid from "@/components/categories/category-grid";
import ProductHomeGrid from "@/components/product/product-home-grid";
import Hero from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* Content with transparent background to reveal hero underneath */}
      <div className="relative  bg-transparent">
        {/* <CategoryGrid /> */}
        <ProductHomeGrid />
      </div>
    </div>
  );
}
