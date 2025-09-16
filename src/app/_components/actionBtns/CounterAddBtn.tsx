'use client'
import { Product } from '@/types/product.t'
import { Minus, Plus } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import AddBtnCart from './AddBtnCart'

const CounterAddBtn = ({ product }: { product: Product }) => {
    const [counter, setCounter] = useState(1)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 1
        setCounter(value);
    }

    return (
        <>
            <div className="w-full sm:w-5/12 flex items-center justify-center border border-border rounded-full">
                {/* Math.max To prevent the user from selecting a negative number or zero */}
                <button onClick={() => setCounter((c) => Math.max(1, c - 1))} className="group py-[14px] px-3 w-full border-r border-border rounded-l-full h-full flex items-center justify-center bg-card cursor-pointer">
                    <Minus className='group-hover:scale-125 group-hover:text-indigo-600 transition-all duration-300' />
                </button>
                <input
                    type="text"
                    className="font-semibold text-primary text-lg py-3 px-2 w-full min-[400px]:min-w-[75px] h-full bg-transparent placeholder:text-card-foreground text-center hover:text-indigo-600 outline-0 hover:placeholder:text-indigo-600"
                    value={counter}
                    onChange={handleInputChange}
                />
                <button onClick={() => setCounter((c) => Math.max(1, c + 1))} className="group py-[14px] px-3 w-full border-l border-border rounded-r-full h-full flex items-center justify-center bg-card cursor-pointer">
                    <Plus className='group-hover:scale-125 group-hover:text-indigo-600 transition-all duration-300' />
                </button>
            </div>
            <AddBtnCart product={product} counter={counter} isHome={false} />
        </>
    )
}

export default CounterAddBtn
