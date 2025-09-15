import React from 'react'
import { type Categories } from '@/types/categories.t'
import { getAllCategories } from '@/apis/categoriesApi'
import Image from 'next/image'

const Categories = async () => {
  const data: Categories[] = await getAllCategories()

  const columns: Categories[][] = [[], [], []];
  data.forEach((category, index) => {
    columns[index % 3].push(category);
  });

  return (
    <section className='my-10 px-5 md:px-0 md:w-4/5 md:mx-auto'>
      <h1 className='text-foreground mb-5 text-2xl font-bold'>Featured Categories</h1>
      <div className="grid grid-cols-3 gap-4 items-start">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="grid gap-4">
            {col.map((category) => (
              <div key={category._id}>
                <figure className='relative'>
                  <Image
                    className="h-auto max-w-full rounded-lg !relative shadow-md shadow-foreground"
                    src={category.image}
                    alt={category.name}
                    fill
                    priority
                  />
                  <figcaption className="text-center mt-2 text-xs md:text-lg">{category.name}</figcaption>
                </figure>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Categories
