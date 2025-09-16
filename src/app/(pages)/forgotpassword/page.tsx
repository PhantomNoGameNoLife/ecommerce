"use client"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotSchema, type ForgotSchemaType } from '@/schema/forgot.s'
import { Loader2 } from 'lucide-react'
import { ForgotPassword } from '@/apis/forgotApi'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const ForgetPassword = () => {
  const router = useRouter()
  const form = useForm<ForgotSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotSchema)
  })

  async function handleForgot(values: ForgotSchemaType) {
    try {
      const data = await ForgotPassword(values.email)
      if (data && data.statusMsg === 'success') {
        toast.success(data.message);
        router.push('/verifyresetcode')
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
            Forgot Password?
          </h1>
          <p className="text-sm font-mono leading-tight tracking-tight text-muted-foreground">
            {`Enter your email and we'll send you instructions to reset your password`}
          </p>
          <Form {...form}>
            <form className="space-y-4 md:space-y-6" onSubmit={form.handleSubmit(handleForgot)}>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          type='email'
                          {...field}
                          placeholder={`Enter your Email`}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='w-full py-5 cursor-pointer' disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send Reset Code"}</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword