'use client'

import { Button } from '@/components/ui/button'
import { addToCartHybrid } from '@/redux/cartSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { Product as ProductCart } from '@/types/cart.t'
import { Product } from '@/types/product.t'
import { Loader2, ShoppingCart } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

const AddBtnCart = ({ product, counter, isHome }: { product: Product, counter?: number, isHome: boolean }) => {
    const { actionCartLoading } = useSelector((state: RootState) => state.cart)
    const isLoading = actionCartLoading.includes(product.id)
    const dispatch = useDispatch<AppDispatch>()

    const productCart: ProductCart = {
        product: { id: product.id, title: product.title, imageCover: product.imageCover },
        count: counter ?? 1,
        price: product.price,
    }

    return (
        <Button size={isHome ? "sm" : "default"} variant={isHome ? "default" : "secondary"} disabled={isLoading} onClick={() => dispatch(addToCartHybrid(productCart))} className={`!cursor-pointer ${isHome ? "relative z-10 flex-1" : "w-7/12 min-[400px]:grow my-2 min-[400px]:my-0 py-6 px-5 rounded-full font-semibold text-lg flex items-center justify-center gap-2 shadow-sm"}`}>
            {isLoading ? <Loader2 className="animate-spin" /> : <>
                <ShoppingCart /> Add
            </>}
        </Button>
    )
}

export default AddBtnCart
