import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
    const columns = [1, 2, 3]
    return (
        <section className='my-10 px-5 md:px-0 md:w-4/5 md:mx-auto'>
            <Skeleton className="h-6 w-[60px] mt-2" />
            <div className="grid grid-cols-3 gap-4 items-start">
                {columns.map((col, colIndex) => (
                    <div key={colIndex} className="grid gap-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i}>
                                <figure className="relative flex flex-col items-center">
                                    <Skeleton className="w-full aspect-square rounded-lg" />
                                    <Skeleton className="h-4 w-2/3 mt-2" />
                                </figure>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default loading
