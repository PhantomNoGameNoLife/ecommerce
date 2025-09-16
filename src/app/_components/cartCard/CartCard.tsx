'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useDebounce } from "use-debounce"
import { Input } from '@/components/ui/input'
import { removeFromCartHybrid, updateCartHybrid } from '@/redux/cartSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { Product } from '@/types/cart.t'
import { Heart, Loader2, Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddBtnWishlist from '../actionBtns/AddBtnWishlist'

const CartCard = ({ product }: { product: Product }) => {
    const { actionCartLoading, remove } = useSelector((state: RootState) => state.cart)
    const isLoading = actionCartLoading.includes(product.product.id)
    const isLoadingRemove = remove.includes(product.product.id)

    const dispatch = useDispatch<AppDispatch>()

    const [value, setValue] = useState(product.count)

    const [debouncedValue] = useDebounce(value, 500)

    useEffect(() => {
        if (debouncedValue !== product.count) {
            dispatch(updateCartHybrid({ id: product.product.id, count: debouncedValue - product.count }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue])

    return (
        <Card className="border-border bg-card text-card-foreground shadow-sm text-center md:text-start">
            <CardContent className="p-4 md:p-6">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <div className="flex items-center gap-4 md:gap-6 flex-col md:flex-row">
                        <Link href={`/productDetails/${product.product.id}`} className="shrink-0">
                            <div className="relative size-20 mx-auto">
                                <Image
                                    className="object-cover hover:scale-105 transition-all duration-500"
                                    fill
                                    src={product.product.imageCover!}
                                    alt={product.product.title!}
                                    sizes="80px"
                                />
                            </div>
                        </Link>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:max-w-md flex flex-col">
                            <Link href={`/productDetails/${product.product.id}`} className="text-base font-medium text-foreground hover:underline line-clamp-1">
                                {product.product.title}
                            </Link>
                            <p className="text-base font-bold text-foreground">{product.price}<sub>EGP</sub></p>
                            <div className="flex items-center gap-4 justify-center md:justify-start">
                               <AddBtnWishlist product={{id: product.product.id , imageCover: product.product.imageCover! , price: product.price , title:product.product.title! }} />

                                <Button variant="ghost" size="sm" disabled={isLoadingRemove} onClick={() => dispatch(removeFromCartHybrid(product.product.id))} className="text-destructive hover:text-destructive/80 cursor-pointer">
                                    {isLoadingRemove ? <Loader2 className="animate-spin" /> : <>
                                        <Trash2 className="me-1.5 size-5" />
                                        Remove
                                    </>
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>

                    <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                    <div className="flex items-center justify-center md:justify-end mt-2 md:mt-0">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={isLoading}
                                onClick={() => setValue((c) => Math.max(c - 1, 0))}
                                className="size-8 border-border bg-muted hover:bg-muted-foreground/20 cursor-pointer"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <Minus className="size-4 text-foreground" />}
                            </Button>
                            <Input
                                type="text"
                                id="counter-input"
                                className="w-12 text-center bg-transparent border-border text-foreground focus:ring-ring"
                                value={value}
                                onChange={(e) => setValue(parseInt(e.target.value) || 1)}
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                disabled={isLoading}
                                onClick={() => setValue((c) => c + 1)}
                                className="size-8 border-border bg-muted hover:bg-muted-foreground/20 cursor-pointer"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <Plus className="size-4 text-foreground" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CartCard
