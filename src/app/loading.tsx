import React from "react";
import ProductCardSkeleton from "./_components/skeleton/ProductCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <main className="px-4 md:px-6 mt-10">
      {/* main slider */}
      <section className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-2/3">
          <Skeleton className="h-[400px] w-full rounded-xl md:rounded-none md:rounded-l-xl" />
        </div>
        <div className="hidden md:w-1/3 md:flex md:flex-col">
          <Skeleton className="h-[200px] w-1/2 md:w-full md:block rounded-r-xl" />
          <Skeleton className="h-[200px] w-1/2 md:w-full md:block rounded-r-xl" />
        </div>
      </section>
      {/* category slider*/}
      <div className="w-full my-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-[230px] overflow-y-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <Skeleton className="h-4 w-2/3 my-3 rounded" />
          </div>
        ))}
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-self-center gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
};

export default loading;