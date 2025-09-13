'use client'
import CartCardSkeleton from './CartCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const CartSkeleton = () => {
    return (
        <section className="bg-background py-8 antialiased md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <Skeleton className="h-8 w-48 mb-6" />

                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    {/* Products list skeleton */}
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <CartCardSkeleton key={i} />
                        ))}
                    </div>
                    {/* Order summary skeleton */}
                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <Card className="border-border bg-card text-card-foreground shadow-sm">
                            <CardHeader>
                                <Skeleton className="h-6 w-32" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 border-b border-border pb-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <Skeleton className="h-5 w-28" />
                                        <Skeleton className="h-5 w-16" />
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <Skeleton className="h-5 w-28" />
                                        <Skeleton className="h-5 w-16" />
                                    </div>
                                </div>
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                                <div className="flex items-center justify-center gap-2">
                                    <Skeleton className="h-4 w-8" />
                                    <Skeleton className="h-5 w-32" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CartSkeleton