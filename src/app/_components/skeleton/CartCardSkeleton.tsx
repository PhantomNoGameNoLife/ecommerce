'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const CartCardSkeleton = () => {
    return (
        <Card className="border-border bg-card text-card-foreground shadow-sm text-center md:text-start">
            <CardContent className="p-4 md:p-6">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <div className="flex items-center gap-4 md:gap-6 flex-col md:flex-row">
                        <div className="shrink-0">
                            <Skeleton className="size-20 mx-auto rounded-md" />
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:max-w-md flex flex-col">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-6 w-1/4" />
                            <div className="flex items-center gap-4 justify-center md:justify-start">
                                <Skeleton className="h-8 w-28" />
                                <Skeleton className="h-8 w-28" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center md:justify-end mt-2 md:mt-0">
                        <div className="flex items-center gap-2">
                            <Skeleton className="size-8 rounded-md" />
                            <Skeleton className="h-8 w-12" />
                            <Skeleton className="size-8 rounded-md" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CartCardSkeleton