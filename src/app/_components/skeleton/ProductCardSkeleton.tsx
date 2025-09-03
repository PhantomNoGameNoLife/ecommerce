import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="w-full max-w-sm bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm">
      <Skeleton className="h-[250px] w-full rounded-t-lg" />
      <div className="p-5">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-6 w-[250px] mt-4" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-[100px]" />
          </div>
          <div className="flex items-center justify-between mt-5">
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-10 w-[80px] rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
