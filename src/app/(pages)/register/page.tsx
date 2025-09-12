"use client"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterSchemaType } from '@/schema/register.s'
import { registerFields } from '@/types/authFailds.t'
import type { UserRegister } from '@/types/user.t'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from 'react'


const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(registerSchema)
  })

  async function createAccount(values: RegisterSchemaType) {
    try {
      const { data }: { data: UserRegister } = await axios.post(`${process.env.NEXT_URL}/auth/signup`, values)
      toast.success(data.message)
      router.push('/login')
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message)
      } else {
        toast.error("Unexpected error happened")
      }
    }
  }

  return (
    <div className="px-2 sm:px-6 py-8 md:h-screen lg:py-0 my-12">
      <div className="w-full mx-auto bg-card rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 border-border">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl">
            Create an account
          </h1>
          <Form {...form}>
            <form className="space-y-4 md:space-y-6" onSubmit={form.handleSubmit(createAccount)}>
              {registerFields.map((f, idx) => (
                <FormField
                  key={idx}
                  control={form.control}
                  name={f.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="capitalize">{f.name === 'rePassword' ? 'confirm password' : f.name}</FormLabel>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            type={f.type === 'password' && showPassword ? 'text' : f.type}
                            {...field}
                            placeholder={`Enter your ${f.name === 'rePassword' ? 'confirm password' : f.name}`}
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
              <Button className='w-full py-5 cursor-pointer' disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create an account"}</Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register
