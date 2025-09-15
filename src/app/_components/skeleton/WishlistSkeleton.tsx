import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const WishlistSkeleton = () => {
    return (
        <section className="bg-background py-8 antialiased md:py-16 mx-auto max-w-screen-xl px-4 2xl:px-0">
            <Skeleton className="h-6 w-40 mb-3" />
            <Skeleton className="h-5 w-32 mb-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Card
                        key={i}
                        className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        {/* Image */}
                        <div className="relative w-full h-48">
                            <Skeleton className="absolute inset-0 w-full h-full" />
                            <div className="absolute top-3 right-3">
                                <Skeleton className="h-5 w-5 rounded-full" />
                            </div>
                        </div>

                        <CardContent className="p-4 space-y-3">
                            {/* Title & Description */}
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-full" />
                                <Skeleton className="h-3 w-5/6" />
                            </div>

                            {/* Price */}
                            <Skeleton className="h-5 w-16" />

                            {/* Buttons */}
                            <div className="flex gap-2 pt-2">
                                <Skeleton className="h-9 flex-1" />
                                <Skeleton className="h-9 w-9" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default WishlistSkeleton