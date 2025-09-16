"use client"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetSchema, type ResetSchemaType } from '@/schema/reset.s'
import { resetFields } from '@/types/authFailds.t'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<ResetSchemaType>({
        defaultValues: {
            email: "",
            newPassword: "",
        },
        resolver: zodResolver(resetSchema)
    })

    async function handleReset(values: ResetSchemaType) {
        console.log(values)
    }

    return (
        <div className="px-2 sm:px-6 h-[calc(100dvh-65px)] flex items-center justify-center">
            <div className="w-full mx-auto bg-card rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 border-border">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl mb-3">
                        Create new password
                    </h1>
                    <p className="text-sm font-mono leading-tight tracking-tight text-muted-foreground">
                        Your new password must be different from previous used passwords
                    </p>
                    <Form {...form}>
                        <form className="space-y-4 md:space-y-6" onSubmit={form.handleSubmit(handleReset)}>
                            {resetFields.map((f, idx) => (
                                <FormField
                                    key={idx}
                                    control={form.control}
                                    name={f.name}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="capitalize">{f.name === 'newPassword' ? 'New Password' : f.name}</FormLabel>
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input
                                                        type={f.type === 'password' && showPassword ? 'text' : f.type}
                                                        {...field}
                                                        placeholder={`Enter your ${f.name === 'newPassword' ? 'New Password' : f.name}`}
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
                            <Button className='w-full py-5 cursor-pointer' disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Reset Password"}</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login