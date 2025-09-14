'use client'

import { Button } from '@/components/ui/button'
import { addToCartHybrid} from '@/redux/cartSlice'
import { AppDispatch} from '@/redux/store'
import { ProductCart } from '@/types/cartRedux.t'
import { Product } from '@/types/product.t'
import { ShoppingCart } from 'lucide-react'
import { useDispatch} from 'react-redux'

const AddBtnCart = ({ product, counter, isHome }: { product: Product, counter?: number, isHome: boolean }) => {
    const dispatch = useDispatch<AppDispatch>()

    const productCart: ProductCart = {
        id: product.id,
        count: counter ?? 1,
        price: product.price,
        title: product.title,
        image: product.imageCover,
    }

    return (
        <Button size={isHome ? "sm" : "default"} variant={isHome ? "default" : "secondary"} onClick={() => dispatch(addToCartHybrid(productCart))} className={`!cursor-pointer ${isHome ? "relative z-10" : "w-7/12 min-[400px]:grow my-2 min-[400px]:my-0 py-6 px-5 rounded-full font-semibold text-lg flex items-center justify-center gap-2 shadow-sm"}`}>
            {!isHome && <ShoppingCart />}
            Add to cart
        </Button>
    )
}

export default AddBtnCart
