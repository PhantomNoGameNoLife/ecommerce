"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const UserSkeleton = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-background/90 to-background">
            <div className="w-full max-w-4xl animate-pulse">
                <Card className="rounded-xl shadow-2xl bg-card text-card-foreground">
                    <CardContent className="p-8 flex flex-col md:flex-row">
                        {/* Left section */}
                        <div className="md:w-1/3 text-center mb-8 md:mb-0">
                            <Skeleton className="w-48 h-48 mx-auto mb-4 rounded-full" />
                            <Skeleton className="h-6 w-32 mx-auto mb-2 rounded" />
                            <div className='flex items-center mt-4 mx-auto flex-col sm:flex-row'>
                                <Skeleton className="h-10 w-40 rounded" />
                                <Skeleton className="h-10 w-40 ms-2 mt-2 sm:mt-0 rounded" />
                            </div>
                        </div>

                        {/* Right section */}
                        <div className="md:w-2/3 md:pl-8 space-y-4">
                            <Skeleton className="h-5 w-1/2 rounded" />
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full rounded" />
                                <Skeleton className="h-4 w-full rounded" />
                            </div>

                            <Skeleton className="h-5 w-1/3 rounded mt-6" />
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full rounded" />
                                <Skeleton className="h-4 w-full rounded" />
                                <Skeleton className="h-4 w-full rounded" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default UserSkeleton