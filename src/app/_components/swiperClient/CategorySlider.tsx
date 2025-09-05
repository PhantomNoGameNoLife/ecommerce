import { getAllCategories } from '@/apis/categoriesApi'
import React from 'react'
import SwiperCategory from './SwiperCategory'

const CategorySlider = async () => {
    const data = await getAllCategories()
    return (
        <section className='mb-5'>
            <SwiperCategory categories={data} />
        </section>
    )
}

export default CategorySlider
