import React from 'react'
import { type Brands } from '@/types/brands.t'
import { getAllBrands } from '@/apis/brandsApi'
import Image from 'next/image'

const Brands = async () => {
  const data: Brands[] = await getAllBrands()

  return (
    <section className='my-10 px-5 md:px-0 md:w-4/5 md:mx-auto'>
      <h1 className='text-foreground mb-5 text-2xl font-bold'>All Brands</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((brand) => (
          <div key={brand._id}>
            <figure className='relative'>
              <Image
                className="h-auto max-w-full rounded-lg !relative shadow-md shadow-foreground"
                src={brand.image}
                alt={brand.name}
                fill
                priority
              />
              <figcaption className="text-center mt-2">{brand.name}</figcaption>
            </figure>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Brands