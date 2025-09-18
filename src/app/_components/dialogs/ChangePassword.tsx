"use client"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { changeSchema, type ChangeSchemaType } from '@/schema/change.s'
import { changeFields } from '@/types/authFields.t'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from 'react'
import { UpdatePassword } from '@/apis/userApi'
import { signOut } from 'next-auth/react'

const ChangePassword = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const form = useForm<ChangeSchemaType>({
        defaultValues: {
            currentPassword: "",
            password: "",
            rePassword: "",
        },
        resolver: zodResolver(changeSchema)
    })

    async function updatePassword(values: ChangeSchemaType) {
        try {
            const data = await UpdatePassword(values)
            toast.success(data.message)
            signOut({ callbackUrl: '/login' })
        } catch (err: unknown) {
            let msg = "Something went wrong";
            if (axios.isAxiosError(err)) {
                msg = err.response?.data?.message || err.message;
            } else if (err instanceof Error) {
                msg = err.message;
            }

            toast.error(msg);
        }
    }

    return (
        <div className="px-2 sm:px-6 py-8">
            <div className="w-full mx-auto bg-card rounded-lg shadow dark:border sm:max-w-lg border-border">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl  mb-3">
                        Change Password
                    </h1>
                    <p className="text-sm font-mono leading-tight tracking-tight text-muted-foreground">
                        {`You'll be logged out after making the change. Use your new password to log back in`}
                    </p>
                    <Form {...form}>
                        <form className="space-y-4 md:space-y-6" onSubmit={form.handleSubmit(updatePassword)}>
                            {changeFields.map((f, idx) => (
                                <FormField
                                    key={idx}
                                    control={form.control}
                                    name={f.name}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="capitalize">
                                                {f.name === 'rePassword' ? 'confirm password' : f.name.replace(/([A-Z])/g, " $1")}
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative w-full">
                                                    <Input
                                                        type={
                                                            f.type === 'password'
                                                                ? f.name === "currentPassword"
                                                                    ? (showCurrentPassword ? "text" : "password")
                                                                    : (showNewPassword ? "text" : "password")
                                                                : f.type
                                                        }
                                                        {...field}
                                                        placeholder={`Enter your ${f.name === 'rePassword' ? 'confirm password' : f.name.replace(/([A-Z])/g, " $1")}`}
                                                    />
                                                    {f.type === 'password' && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                f.name === "currentPassword"
                                                                    ? setShowCurrentPassword(!showCurrentPassword)
                                                                    : setShowNewPassword(!showNewPassword)
                                                            }
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                        >
                                                            {f.name === "currentPassword"
                                                                ? (showCurrentPassword ? <AiFillEye /> : <AiFillEyeInvisible />)
                                                                : (showNewPassword ? <AiFillEye /> : <AiFillEyeInvisible />)}
                                                        </button>
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <Button className='w-full py-5 cursor-pointer' disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting
                                    ? <Loader2 className="h-5 w-5 animate-spin" />
                                    : "Change password"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword