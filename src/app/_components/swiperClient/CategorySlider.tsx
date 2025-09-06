import { getAllCategories } from '@/apis/categoriesApi'
import React from 'react'
import SwiperCategory from './SwiperCategory'
import { Categories } from '@/types/categories.t'

const CategorySlider = async () => {
    const data: Categories[] = await getAllCategories()
    return (
        <section className='mb-5'>
            <SwiperCategory categories={data} />
        </section>
    )
}

export default CategorySlider
