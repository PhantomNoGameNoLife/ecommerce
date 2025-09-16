import React from "react";
import ProductCard from "./_components/productCard/ProductCard";
import { Product } from "@/types/product.t";
import { getAllProducts } from "@/apis/productsApi";
import HomeSlider from "./_components/swiperClient/HomeSlider";
import CategorySlider from "./_components/swiperClient/CategorySlider";
import PaginationWrapper from "./_components/Pagination/PaginationWrapper";

const Products = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const {page} = await searchParams;
  const currentPage = Number(page) || 1;

  const { data, metadata } = await getAllProducts(currentPage, 20);
  const totalPages = metadata?.numberOfPages || 1;

  return (
    <main className="mt-8 px-4 md:px-6">
      <HomeSlider />
      <CategorySlider />
      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-self-center gap-4">
        {data.map((pro: Product) => (
          <ProductCard key={pro.id} product={pro} />
        ))}
      </section>

      <div className="my-10 flex justify-center">
        <PaginationWrapper totalPages={totalPages} />
      </div>
    </main>
  );
};

export default Products;
