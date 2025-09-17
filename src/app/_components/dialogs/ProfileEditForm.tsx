"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"

import { profileSchema, type ProfileSchemaType } from "@/schema/profile.s"
import { profileFields } from "@/types/authFailds.t"
import { AvatarUpload } from "../avatarUpload/AvatarUpload"
import { AppDispatch, RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { AddAddress, UpdateUser } from "@/apis/userApi"
import { fetchUser } from "@/redux/userSlice"


const ProfileEditForm = () => {
    const { data } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()

    const form = useForm<ProfileSchemaType>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            avatar: "",
            name: data?.name,
            email: data?.email,
            phone: data?.phone,
            addressName: data?.addresses[data?.addresses.length - 1].name,
            addressPhone: data?.addresses[data?.addresses.length - 1].phone,
            addressCity: data?.addresses[data?.addresses.length - 1].city,
        },
    })

    async function updateProfile(values: ProfileSchemaType) {
        try {
            const payload = {
                user: {
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                },
                address: {
                    name: values.addressName,
                    details: values.avatar,
                    phone: values.addressPhone,
                    city: values.addressCity,
                },
            }

            const message = await UpdateUser(payload.user)
            const status = await AddAddress(payload.address)
            if (message === 'success' && status === 'success') {
                await dispatch(fetchUser());
                toast.success("Profile updated successfully!")
            }
            else toast.error("Failed to update profile")
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err: unknown) {
            toast.error("Failed to update profile")
        }
    }

    return (
        <div className="px-2 sm:px-6 py-8">
            <div className="w-full mx-auto bg-card rounded-lg shadow border-border sm:max-w-lg">
                <div className="p-6 space-y-6">
                    <h1 className="text-xl font-bold leading-tight text-primary md:text-2xl">Update Profile</h1>

                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(updateProfile)}>
                            {profileFields.map((f, idx) => (
                                <FormField
                                    key={idx}
                                    control={form.control}
                                    name={f.name as keyof ProfileSchemaType}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="capitalize">
                                                {f.name.replace(/([A-Z])/g, " $1")}
                                            </FormLabel>
                                            <FormControl>
                                                {f.type === "file" ? (
                                                    <AvatarUpload onUpload={(url) => field.onChange(url)} />
                                                ) : (
                                                    <Input type={f.type} {...field} placeholder={`Enter your ${f.name}`} />
                                                )}
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <Button className="w-full py-5 cursor-pointer" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save Changes"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ProfileEditForm