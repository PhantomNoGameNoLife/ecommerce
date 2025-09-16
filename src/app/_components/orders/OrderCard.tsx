'use client'
import React from 'react'
import OrderItem from './OrderItem'
import { Order } from '@/types/orders.t'
import { format } from "date-fns";

const OrderCard = ({ order }: { order: Order }) => {
    return (
        <div className="main-box border border-border rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full bg-card text-card-foreground mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-border">
                <p className="font-semibold text-base leading-7 text-foreground">
                    Order Id: <span className="text-primary font-medium">{order.id}</span>
                </p>
                <p className="font-semibold text-base leading-7 text-foreground mt-4">
                    Order Date : <span className="text-muted-foreground font-medium">{format(new Date(order.createdAt), "do MMMM yyyy")}</span>
                </p>
            </div>

            <div className="w-full px-3 min-[400px]:px-6">
                {order.cartItems.map((item) =>
                    <OrderItem key={item.product.id} item={item} />
                )}
            </div>

            {/* --------- Footer --------- */}
            <div className="w-full border-t border-border px-6 py-3 flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-6 max-lg:text-center">
                    {/* Payment Method */}
                    <p className="font-medium text-lg text-foreground">
                        Payment Method:{" "}
                        <span className="text-muted-foreground">{order.paymentMethodType}</span>
                    </p>

                    {/* Paid Status */}
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-lg text-foreground">Paid:</p>
                        {order.isPaid ? (
                            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium">
                                Yes
                            </span>
                        ) : (
                            <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                                No
                            </span>
                        )}
                    </div>

                    {/* Delivered Status */}
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-lg text-foreground">Delivered:</p>
                        {order.isDelivered ? (
                            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium">
                                Yes
                            </span>
                        ) : (
                            <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                                Pending
                            </span>
                        )}
                    </div>
                </div>

                {/* Total Price */}
                <p className="font-semibold text-lg text-foreground">
                    Total Price: <span className="text-primary">{order.totalOrderPrice}<sub>EGP</sub></span>
                </p>
            </div>
        </div>
    )
}

export default OrderCard
