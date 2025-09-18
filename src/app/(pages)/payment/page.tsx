"use client"
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { paymentSchema, type PaymentSchemaType } from '@/schema/payment.s'
import { paymentFields } from '@/types/authFields.t'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { cashOrder, checkoutSession, paymentClearStatus } from '@/redux/paymentSlice'
import toast from 'react-hot-toast'
import { clearCart } from '@/redux/cartSlice'
import { useRouter } from 'next/navigation'
import { fetchOrders } from '@/redux/ordersSlice'

const Payment = () => {
    const router = useRouter()
    const { cartId } = useSelector((state: RootState) => state.cart)
    const { paymentLoading, paymentSuccess, paymentError, url } = useSelector((state: RootState) => state.payment)
    const dispatch = useDispatch<AppDispatch>()
    const [method, setMethod] = useState('Cash Payment');
    const form = useForm<PaymentSchemaType>({
        defaultValues: {
            phone: "",
            city: "",
            details: "",
        },
        resolver: zodResolver(paymentSchema)
    })

    async function handlePayment(data: PaymentSchemaType) {
        const values = {
            shippingAddress: {
                details: data.details,
                phone: data.phone,
                city: data.city
            }
        }
        console.log(cartId)
        if (method === "Cash Payment") {
            dispatch(cashOrder({ id: cartId, values }));
        } else {
            dispatch(checkoutSession({ id: cartId, values }));
        }
    }

    useEffect(() => {
        async function getOrders() {
            await dispatch(fetchOrders());
        }
        if (paymentSuccess) {
            dispatch(clearCart())
            toast.success(paymentSuccess)
            if (method === 'Cash Payment') {
                getOrders()
                router.push('/allorders')
            }
            else
                window.location.href = url!

        dispatch(paymentClearStatus())
        }

        if (paymentError) {
            toast.error(paymentError)
            dispatch(paymentClearStatus())
        }
    }, [paymentSuccess, paymentError, dispatch, router, method, url])

    return (
        <div className="px-2 sm:px-6 h-[calc(100dvh-65px)] flex items-center justify-center">
            <div className="w-full mx-auto bg-card rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 border-border">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
                        Make a Payment
                    </h1>
                    <Form {...form}>
                        <form className="space-y-4 md:space-y-6" onSubmit={form.handleSubmit(handlePayment)}>
                            {paymentFields.map((f, idx) => (
                                <FormField
                                    key={idx}
                                    control={form.control}
                                    name={f.name}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="capitalize">{f.name}</FormLabel>
                                            <FormControl>
                                                <div className="relative w-full">
                                                    {f.name === "details" ? (
                                                        <Textarea
                                                            {...field}
                                                            placeholder={`Enter your address or details`}
                                                            className="!resize-none !break-all h-20 scrollbar-thin overflow-x-hidden scrollbar-thumb-primary scrollbar-track-background"
                                                        />
                                                    ) : (
                                                        <Input
                                                            type={f.type}
                                                            {...field}
                                                            placeholder={`Enter your ${f.name}`}
                                                        />
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <RadioGroup
                                value={method}
                                onValueChange={(val) => setMethod(val)}
                                className="flex items-center gap-6 mb-8 mt-6"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Cash Payment" id="cash" />
                                    <Label htmlFor="cash">Cash Payment</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Online Payment" id="online" />
                                    <Label htmlFor="online">Online Payment</Label>
                                </div>
                            </RadioGroup>
                            <Button className='w-full py-5 cursor-pointer' disabled={paymentLoading}>{paymentLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : `Continue With ${method}`}</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Payment