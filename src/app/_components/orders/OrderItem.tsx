'use client'
import { CartItem } from '@/types/orders.t'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const OrderItem = ({ item }: { item: CartItem }) => {
    return (
        <div className="flex flex-col lg:flex-row items-center py-6 border-b border-border last:!border-none gap-6 w-full">
            <Link href={`/productDetails/${item.product.id}`}>
                <div className="img-box max-lg:w-full relative">
                    <Image fill src={item.product.imageCover} alt={item.product.title}
                        className="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover !relative !h-[140px] lg:!h-auto" />
                </div>
            </Link>
            <div className="flex flex-row items-center w-full ">
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                    <div className="flex items-center">
                        <div>
                            <h2 className="font-semibold text-xl leading-8 text-foreground mb-3 line-clamp-1">
                                {item.product.title}
                            </h2>
                            <p className="font-normal text-lg leading-8 text-muted-foreground mb-3">
                                {item.product.brand.name}
                            </p>
                            <div className="flex items-center ">
                                <p className="flex items-center font-medium text-base leading-7 text-foreground pr-4 mr-4 border-r border-border">
                                    Ratings:
                                    <span className="text-muted-foreground ms-1">{item.product.ratingsAverage}</span>
                                    <Star className='text-amber-400 fill-amber-400 ms-1' />
                                </p>
                                <p className="font-medium text-base leading-7 text-foreground pr-4 mr-4 border-r border-border">
                                    Qty: <span className="text-muted-foreground">{item.count}</span>
                                </p>
                                <p className="font-medium text-base leading-7 text-foreground">
                                    Price: <span className="text-muted-foreground">{item.price}<sub>EGP</sub></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderItem
