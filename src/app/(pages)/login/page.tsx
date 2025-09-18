"use client"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginSchemaType } from '@/schema/login.s'
import { loginFields } from '@/types/authFields.t'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })

  async function handleSignIn(values: LoginSchemaType) {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: '/'
    })
    if (res?.ok) {
      toast.success('login success');
      window.location.href = '/'
    }
    else toast.error(res?.error || 'faild login')
  }

  return (
    <div className="px-2 sm:px-6 h-[calc(100dvh-65px)] flex items-center justify-center">
      <div className="w-full mx-auto bg-card rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 border-border">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
            Sign in to your account
          </h1>
          <Form {...form}>
            <form className="space-y-4 md:space-y-6" onSubmit={form.handleSubmit(handleSignIn)}>
              {loginFields.map((f, idx) => (
                <FormField
                  key={idx}
                  control={form.control}
                  name={f.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize">{f.name}</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            type={f.type === 'password' && showPassword ? 'text' : f.type}
                            {...field}
                            placeholder={`Enter your ${f.name}`}
                          />
                          {f.type === 'password' && <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                          </button>}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-end mb-2 -mt-2">
                <Link href="/forgotpassword" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot Password?</Link>
              </p>
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
