"use client"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginSchemaType } from '@/schema/login.s'
import { loginFields } from '@/types/authFailds.t'
import type { UserRegister } from '@/types/user.t'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'


const Login = () => {
  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })

  async function signIn(values: LoginSchemaType) {
    try {
      const { data }: { data: UserRegister } = await axios.post(`${process.env.NEXT_URL}/auth/signin`, values)
      toast.success(data.message)
      router.push('/')
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message)
      } else {
        toast.error("Unexpected error happened")
      }
    }
  }

  return (
    <div className="px-6 py-8 md:h-screen lg:py-0 my-12">
      <div className="w-full mx-auto bg-card rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 border-border">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
            Sign in to your account
          </h1>
          <Form {...form}>
            <form className="space-y-4 md:space-y-6" onSubmit={form.handleSubmit(signIn)}>
              {loginFields.map((f, idx) => (
                <FormField
                  key={idx}
                  control={form.control}
                  name={f.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize">{f.name}</FormLabel>
                      <FormControl>
                        <Input
                          type={f.type}
                          {...field}
                          placeholder={`Enter your ${f.name}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button className='w-full py-5 cursor-pointer' disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}</Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
