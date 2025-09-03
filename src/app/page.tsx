import React from 'react'
import ProductCard from './_components/productCard/ProductCard'
import { Product } from '@/types/product'

const page = async () => {
  const { data } = await (await fetch(`${process.env.API_SECRET_KEY}/api/v1/products`)).json()
  return (
    <section className='px-4 md:px-6 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-self-center gap-4'>
      {data.map((pro:Product)=> <ProductCard key={pro._id} _id={pro._id} imageCover={pro.imageCover} price={pro.price} ratingsAverage={pro.ratingsAverage} title={pro.title} />)}
    </section>
  )
}

export default page

