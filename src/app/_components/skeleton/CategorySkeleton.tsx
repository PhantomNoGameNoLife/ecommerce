"use client";

import { Skeleton } from "@/components/ui/skeleton";

const CategorySkeleton = () => {
    let itemCount = 5;

    const width = window.innerWidth;

    if (width < 768) itemCount = 2;
    else if (width < 1024) itemCount = 3;

    return (
        <div className="flex w-full my-10">
            {Array.from({ length: itemCount }).map((_, i) => (
                <div key={i} className={`flex flex-col items-center w-1/${itemCount}`}>
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <Skeleton className="h-4 w-2/3 my-3 rounded" />
                </div>
            ))}
        </div>
    );
};

export default CategorySkeleton;