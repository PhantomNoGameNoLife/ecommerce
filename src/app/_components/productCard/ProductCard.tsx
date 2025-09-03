'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Rating } from 'react-simple-star-rating'

const ProductCard = ({imageCover,price,title,ratingsAverage}) => {
  return (
    <div className="w-full max-w-sm bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm">
        <Link href="/products">
            <Image className='!w-full !h-[300px] sm:!h-[250px] object-cover' width={300} height={300} src={imageCover} alt='' />
        </Link>
        <div className="p-5">
            <Link href="/products">
                <h5 className="text-xl font-semibold tracking-tight text-[var(--primary)] line-clamp-1">{title}</h5>
            </Link>
            <div className="mt-2.5 mb-5">
                <Rating initialValue={ratingsAverage} allowFraction showTooltip readonly SVGclassName="inline-block size-5" tooltipClassName='!text-[#171717] !bg-[#f5f5f5] dark:!text-[#fafafa] dark:!bg-[#262626] !px-1.5 !py-0.5 !ml-2.5'/>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[var(--primary)]">{price}<sub>EGP</sub></span>
                <Button size="sm" className='cursor-pointer'>Add to cart</Button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard
