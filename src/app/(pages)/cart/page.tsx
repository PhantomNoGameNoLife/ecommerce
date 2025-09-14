'use client'
import CartCard from '@/app/_components/cartCard/CartCard'
import CartSkeleton from '@/app/_components/skeleton/CartSkeleton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { clearCartLocal } from '@/redux/cartSlice'
import { RootState } from '@/redux/store'
import { ArrowBigRight } from 'lucide-react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
  const dispatch = useDispatch()
  const cartState = useSelector((state: RootState) => state.cart)

  if (cartState.loading) return <CartSkeleton />

  if (cartState.numOfCartItems === 0) {
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

          <Link href="/" passHref>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-background py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl mb-6">Shopping Cart</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          {/* Products list */}
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-4">
            {cartState?.data.products.slice().reverse().map((pro) => <CartCard key={pro.id} product={pro} />)}
          </div>
          {/* Order summary */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <Card className="border-border bg-card text-card-foreground shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 border-b border-border pb-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-muted-foreground">Number of Items</dt>
                    <dd className="text-base font-medium text-foreground">{cartState?.numOfCartItems}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-muted-foreground">Total Price</dt>
                    <dd className="text-base font-medium text-green-600">{cartState?.data.totalCartPrice}</dd>
                  </dl>
                </div>
                <Button
                  variant="default"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                >
                  Proceed to Checkout
                </Button>
                <Button
                  onClick={() => dispatch(clearCartLocal())}
                  variant="destructive"
                  className="w-full cursor-pointer"
                >
                  Clear Cart
                </Button>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-muted-foreground">or</span>
                  <Link
                    href="/"
                    title="Continue Shopping"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    Continue Shopping
                    <ArrowBigRight className="h-5 w-5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart