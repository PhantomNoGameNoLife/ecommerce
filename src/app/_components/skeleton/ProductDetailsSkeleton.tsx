import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* (swiper skeleton) */}
          <div className="w-full h-full max-lg:mx-auto">
            <div className="relative mb-6 border rounded-2xl overflow-hidden">
              <Skeleton className="w-full aspect-square rounded-2xl" />
              <div className="flex flex-col gap-2 mt-4 justify-center absolute left-0 bottom-0">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="size-10 sm:size-20 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product detalis */}
          <div className="flex justify-center items-center">
            <div className="w-full max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mt-8 space-y-6">
              {/*  title and category */}
              <div>
                <Skeleton className="h-8 w-2/3 mb-2" />
                <Skeleton className="h-5 w-1/3" />
              </div>

              {/* price and rating */}
              <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center gap-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-32 rounded-lg" />
              </div>

              {/* description */}
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-4/6" />

              {/* (brand, quantity) */}
              <ul className="grid gap-y-4">
                <li className="flex items-center gap-3">
                  <Skeleton className="h-5 w-40" />
                </li>
                <li className="flex items-center gap-3">
                  <Skeleton className="h-5 w-32" />
                </li>
              </ul>

              {/* counter + add to cart */}
              <div className="flex flex-col min-[400px]:flex-row gap-3">
                <Skeleton className="h-12 w-32 rounded-full" />
                <Skeleton className="h-12 flex-1 rounded-full" />
              </div>

              {/* buy now */}
              <Skeleton className="h-14 w-full rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsSkeleton;
