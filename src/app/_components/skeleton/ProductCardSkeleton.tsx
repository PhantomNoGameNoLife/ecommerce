import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
      <div className="w-full bg-card border border-border rounded-lg shadow-sm">
        <Skeleton className="!w-full !h-[300px] sm:!h-[250px] rounded-t-lg" />
        <div className="p-5">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-6 w-2/3 mb-1" />
            <Skeleton className="h-6 w-3/4" />
            <div className="mt-2.5 mb-5 flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="size-5 me-1 [clip-path:polygon(50%_0%,_61%_35%,_98%_35%,_68%_57%,_79%_91%,_50%_70%,_21%_91%,_32%_57%,_2%_35%,_39%_35%)]" />
              ))}
              <Skeleton className="h-6 w-8 ml-2.5" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-8 w-1/2 rounded-md" />
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProductCardSkeleton;
