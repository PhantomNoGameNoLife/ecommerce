"use client"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { verifySchema, type VerifySchemaType } from '@/schema/verify.s'
import { Loader2 } from 'lucide-react'
import { VerfiyCode } from '@/apis/forgotApi'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const ForgetPassword = () => {
    const router = useRouter()

    const form = useForm<VerifySchemaType>({
        defaultValues: {
            resetCode: "",
        },
        resolver: zodResolver(verifySchema)
    })

    async function handleVerify(values: VerifySchemaType) {
        try {
            const data = await VerfiyCode(values.resetCode)
            if (data && data.status === 'success') {
                toast.success('Code has been verified');
                router.push('/resetpassword')
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else toast.error("Something went wrong");
        }
    }

    return (
        <div className="px-2 sm:px-6 h-[calc(100dvh-65px)] flex items-center justify-center">
            <div className="w-full mx-auto bg-card rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 border-border">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl mb-3">
                        Confirm OTP
                    </h1>
                    <p className="text-sm font-mono leading-tight tracking-tight text-muted-foreground">
                        Enter the OTP we just send to you
                    </p>
                    <Form {...form}>
                        <form className="space-y-4 md:space-y-6" onSubmit={form.handleSubmit(handleVerify)}>
                            <FormField
                                control={form.control}
                                name='resetCode'
                                render={({ field }) => (
                                    <FormItem className='items-center !justify-center'>
                                        <FormLabel>OTP</FormLabel>
                                        <FormControl>
                                            <div className="relative w-full">
                                                <InputOTP maxLength={6} {...field}>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                        <InputOTPSlot index={1} />
                                                        <InputOTPSlot index={2} />
                                                    </InputOTPGroup>
                                                    <InputOTPSeparator />
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={3} />
                                                        <InputOTPSlot index={4} />
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className='w-full py-5 cursor-pointer' disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Confirm OTP"}</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword