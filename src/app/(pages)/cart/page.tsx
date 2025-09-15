'use client'
import CartCard from '@/app/_components/cartCard/CartCard'
import { ClearCart } from '@/app/_components/dialogs/ClearCart'
import EmptyCart from '@/app/_components/emptyPages/EmptyCart'
import CartSkeleton from '@/app/_components/skeleton/CartSkeleton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AppDispatch, RootState } from '@/redux/store'
import { ArrowBigRight } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, numOfCartItems, data, clear } = useSelector((state: RootState) => state.cart)
  const { status } = useSession()
  const router = useRouter()

  function handleOrder() {
    if (status === 'unauthenticated') {
      router.push('/login')
      toast('Please login first to make an order')
    }
    else if (status === 'authenticated') {
      router.push('/allorders')
    }
  }

  if (loading) return <CartSkeleton />

  if (numOfCartItems === 0) {
    return <EmptyCart />
  }


  return (
    <section className="bg-background py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl mb-6">Shopping Cart</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          {/* Products list */}
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-4">
            {data?.products.slice().reverse().map((pro) => <CartCard key={pro.product.id} product={pro} />)}
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
                    <dd className="text-base font-medium text-foreground">{numOfCartItems}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-muted-foreground">Total number of items</dt>
                    <dd className="text-base font-medium text-foreground">{data.products.reduce((total, product) => total + product.count, 0)}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-muted-foreground">Total Price</dt>
                    <dd className="text-base font-medium text-green-600">{data.totalCartPrice}<sub>EGP</sub></dd>
                  </dl>
                </div>
                <Button
                  variant="default"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                  onClick={handleOrder}
                >
                  Proceed to Checkout
                </Button>
                <ClearCart clear={clear} dispatch={dispatch} />
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