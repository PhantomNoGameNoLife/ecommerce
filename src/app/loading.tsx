import React from "react";
import ProductCardSkeleton from "./_components/skeleton/ProductCardSkeleton";

const loading = () => {
  return (
    <div className="px-4 md:px-6 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-self-center gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default loading;
