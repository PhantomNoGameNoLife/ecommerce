'use client'
import { Button } from '@/components/ui/button';
import { AppDispatch, RootState } from '@/redux/store';
import { addToWishlistHybrid, removeFromWishlistHybrid } from '@/redux/wishlistSlice';
import { Product } from '@/types/product.t';
import { Loader2, HeartPlus } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AddBtnWishlist = ({ product }: { product: Product }) => {

    const { actionWishlistLoading, data } = useSelector((state: RootState) => state.wishlist)
    const isLoading = actionWishlistLoading.includes(product.id)
    const dispatch = useDispatch<AppDispatch>()
    const existingProduct = data.find(
        (p) => p.id === product.id
    );

    function handleFav() {
        if (existingProduct) 
            dispatch(removeFromWishlistHybrid(product.id))
        else 
            dispatch(addToWishlistHybrid(product))
    }

    return (
        <Button variant='ghost' aria-label="Heart" size='icon' disabled={isLoading} onClick={handleFav} className='rounded-full relative z-10 cursor-pointer group'>
            {isLoading ? <Loader2 className="animate-spin" /> : <HeartPlus className={`!size-8 text-foreground group-hover:text-red-500 transition-all duration-300 ${existingProduct ? 'fill-red-500 text-red-500 group-hover:fill-transparent' : ''}`} />}
        </Button>
    )
}

export default AddBtnWishlist
