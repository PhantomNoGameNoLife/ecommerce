import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
  return (
    <section className='my-10 px-5 md:px-0 md:w-4/5 md:mx-auto'>
      <Skeleton className="h-4 w-[70px] mt-2" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <figure className="relative flex flex-col items-center">
              <Skeleton className="w-full aspect-square rounded-lg shadow-md" />
              <Skeleton className="h-4 w-2/3 mt-2" />
            </figure>
          </div>
        ))}
      </div>
    </section>
  )
}

export default loading