'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Rating } from 'react-simple-star-rating'
import { Product } from '@/types/product';

const ProductCard =  ({product}:{product:Product}) => {
  return (
    <div className="w-full max-w-sm bg-[var(--card)] border border-border rounded-lg shadow-sm">
        <Link href={`/productDetails/${product.id}`}>
            <Image className='!w-full !h-[300px] sm:!h-[250px] object-cover rounded-t-lg' width={300} height={300} src={product.imageCover} alt={product.title} />
        </Link>
        <div className="p-5">
            <h4 className="text-md font-bold tracking-tight text-chart-1 line-clamp-1 mb-1">{product.category.name}</h4>
            <Link href={`/productDetails/${product.id}`}>
                <h5 className="text-xl font-semibold tracking-tight text-primary line-clamp-1">{product.title}</h5>
            </Link>
            <div className="mt-2.5 mb-5">
                <Rating initialValue={product.ratingsAverage} allowFraction showTooltip readonly SVGclassName="inline-block size-5" tooltipClassName='!text-[#171717] !bg-[#f5f5f5] dark:!text-[#fafafa] dark:!bg-[#262626] !px-1.5 !py-0.5 !ml-2.5'/>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">{product.price}<sub>EGP</sub></span>
                <Button size="sm" className='cursor-pointer'>Add to cart</Button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard