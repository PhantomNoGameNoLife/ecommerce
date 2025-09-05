import React from 'react'
import ProductCard from './_components/productCard/ProductCard'
import { Product } from '@/types/product'
import { getAllProducts } from '@/apis/productsApi'

const page = async () => {
  const data = await getAllProducts()
  return (
    <section className='px-4 md:px-6 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-self-center gap-4'>
      {data.map((pro:Product)=> <ProductCard key={pro.id} id={pro.id} category={pro.category} imageCover={pro.imageCover} price={pro.price} ratingsAverage={pro.ratingsAverage} title={pro.title} />)}
    </section>
  )
}

export default page

