'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Rating } from 'react-simple-star-rating'
import { Product } from '@/types/product.t';
import GlareHover from '@/components/GlareHover'
import { useDispatch } from 'react-redux'
import { addToCartLocal, ProductCart } from '@/redux/cartSlice'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

const ProductCard = ({ product }: { product: Product }) => {
    const { status } = useSession()
    const dispatch = useDispatch()

    const productCart: ProductCart = {
        id: product.id,
        count: 1,
        price: product.price,
        title: product.title,
        image: product.imageCover,
    }

    function addToCart(productCart: ProductCart) {
        if (status === 'unauthenticated') {
            dispatch(addToCartLocal(productCart))
            toast.success('product added to cart')
        }
    }

    return (
        <GlareHover
            glareColor="var(--glare)"
            glareOpacity={0.3}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={1200}
            playOnce={false}
            height='100%'
            width='100%'
            className='!cursor-default !border-none'
        >
            <div className="w-full max-w-sm bg-[var(--card)] border border-border rounded-lg shadow-sm">
                <Link href={`/productDetails/${product.id}`}>
                    <div className="relative w-full h-[300px] sm:h-[250px] overflow-hidden">
                        <Image src={product.imageCover} alt={product.title} fill className="object-cover rounded-t-lg hover:scale-125 transition-all duration-500" />
                    </div>
                </Link>
                <div className="p-5 !bg-primary-foreground">
                    <h4 className="text-md font-bold tracking-tight text-chart-1 line-clamp-1 mb-1">{product.category.name}</h4>
                    <Link href={`/productDetails/${product.id}`}>
                        <h5 className="text-xl font-semibold tracking-tight text-primary line-clamp-1 relative z-10">{product.title}</h5>
                    </Link>
                    <div className="mt-2.5 mb-5">
                        <Rating initialValue={product.ratingsAverage} allowFraction showTooltip readonly SVGclassName="inline-block size-5" tooltipClassName='!text-[#171717] !bg-[#f5f5f5] dark:!text-[#fafafa] dark:!bg-[#262626] !px-1.5 !py-0.5 !ml-2.5' />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{product.price}<sub>EGP</sub></span>
                        <Button size="sm" className='!cursor-pointer relative z-10' onClick={() => addToCart(productCart)}>Add to Cart</Button>
                    </div>
                </div>
            </div>
        </GlareHover>
    )
}

export default ProductCard