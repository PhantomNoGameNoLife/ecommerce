'use client'
import { Skeleton } from "@/components/ui/skeleton"

const OrdersSkeleton = () => {
    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                <Skeleton className="h-6 w-3/4 mx-auto mb-11" />

                {[...Array(2)].map((_, i) => (
                    <div key={i} className="border border-border rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full bg-card text-card-foreground mb-6">
                        {/* Header */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-border gap-4">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-5 w-32" />
                        </div>

                        {/* Items */}
                        <div className="w-full px-3 min-[400px]:px-6">
                            {[...Array(2)].map((_, j) => (
                                <div key={j} className="flex flex-col lg:flex-row items-center py-6 border-b border-border gap-6 w-full">
                                    <Skeleton className="w-full lg:w-[140px] h-[200px] rounded-xl" />
                                    <div className="flex flex-col gap-3 w-full">
                                        <Skeleton className="h-6 w-2/3" />
                                        <Skeleton className="h-5 w-24" />
                                        <div className="flex items-center gap-4">
                                            <Skeleton className="h-5 w-16" />
                                            <Skeleton className="h-5 w-12" />
                                            <Skeleton className="h-5 w-20" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="w-full border-t border-border px-6 flex flex-col lg:flex-row items-center justify-between gap-4 py-4">
                            <div className="flex flex-col sm:flex-row items-center gap-6 max-lg:text-center">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-6 w-14 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                            </div>
                            <Skeleton className="h-6 w-28" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default OrdersSkeleton