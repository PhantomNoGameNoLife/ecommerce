'use client'
import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import OrderCard from '@/app/_components/orders/OrderCard'
import OrdersSkeleton from '@/app/_components/skeleton/OrderSkeleton'
import EmptyOrders from '@/app/_components/emptyPages/EmptyOrder'


const Orders = () => {
    const { orderLoading, data } = useSelector((state: RootState) => state.orders)

    if (orderLoading) {
        return <OrdersSkeleton />
    }

    if (!data || data.length === 0) {
        return <EmptyOrders />
    }

    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                <p className="mt-4 font-normal text-lg leading-8 text-muted-foreground mb-11 text-center">
                    Thanks for making a purchase you can check our order summary from below
                </p>
                {data.map((order) =>
                    <OrderCard key={order.id} order={order} />
                )}
            </div>
        </section>
    )
}

export default Orders