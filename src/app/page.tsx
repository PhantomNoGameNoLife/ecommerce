import React from "react";
import ProductCard from "./_components/productCard/ProductCard";
import { Product } from "@/types/product";
import { getAllProducts } from "@/apis/productsApi";
import HomeSlider from "./_components/swiperClient/HomeSlider";
import CategorySlider from "./_components/swiperClient/CategorySlider";

const page = async () => {
  const data = await getAllProducts();
  return (
    <main className="mt-8 px-4 md:px-6">
      <HomeSlider />
      <CategorySlider />
      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-self-center gap-4">
        {data.map((pro: Product) => (
          <ProductCard key={pro.id} product={pro} />
        ))}
      </section>
    </main>
  );
};

export default page;
