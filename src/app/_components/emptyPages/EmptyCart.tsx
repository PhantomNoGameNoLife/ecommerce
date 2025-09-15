import { Button } from '@/components/ui/button'
import { Link } from 'lucide-react'
import React from 'react'

const EmptyCart = () => {
    return (
        <section className="bg-background h-[calc(100dvh-65px)] antialiased flex items-center justify-center">
            <div className="text-center space-y-6">
                <div className="flex justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-24 w-24 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9v9"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-semibold text-foreground">Your cart is empty</h2>
                <p className="text-muted-foreground text-sm">
                    Looks like you haven’t added anything to your cart yet.
                </p>

                <Link href="/">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        </section>
    )
}

export default EmptyCart
