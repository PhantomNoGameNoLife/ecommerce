"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProfileEditForm from "@/app/_components/dialogs/ProfileEditForm"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import UserSkeleton from "@/app/_components/skeleton/UserSkeleton"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import ChangePassword from "@/app/_components/dialogs/ChangePassword"

const ProfilePage = () => {
  const { userLoading, data } = useSelector((state: RootState) => state.user)

  if (userLoading) {
    return <UserSkeleton />
  }

  const lastAddress = data?.addresses?.length ? data.addresses[data.addresses.length - 1] : null

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-background/90 to-background">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="rounded-xl shadow-2xl bg-card text-card-foreground">
          <CardContent className="p-8 flex flex-col md:flex-row">
            {/* Left section */}
            <div className="md:w-1/3 text-center mb-8 md:mb-0">
              {lastAddress?.details?.startsWith("http") ? (
                <Image
                  src={lastAddress.details}
                  alt="Profile Picture"
                  width={192}
                  height={192}
                  className="rounded-full size-48 mx-auto mb-4 border-4 border-primary transition-transform duration-300 hover:scale-105 object-cover"
                />
              ) : (
                <div className="size-48 mx-auto mb-4 rounded-full flex items-center justify-center bg-foreground text-primary-foreground border-4 border-primary overflow-hidden">
                  <span className='select-none font-bold text-6xl antialiased font-mono'>
                    {data?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {data?.name}
              </h1>

              {/* Edit Profile with Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer">
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto scrollbar-thin overflow-x-hidden scrollbar-thumb-primary scrollbar-track-background px-0">
                  <VisuallyHidden>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </VisuallyHidden>
                  <ProfileEditForm />
                </DialogContent>
              </Dialog>

              {/* Change Password Profile with Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-4 ms-2 bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer">
                    Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto scrollbar-thin overflow-x-hidden scrollbar-thumb-primary scrollbar-track-background px-0">
                  <VisuallyHidden>
                    <DialogTitle>Change Password Profile</DialogTitle>
                  </VisuallyHidden>
                  <ChangePassword />
                </DialogContent>
              </Dialog>
            </div>

            {/* Right section */}
            <div className="md:w-2/3 md:pl-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Contact Information
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  {data?.email}
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  {data?.phone}
                </li>
              </ul>

              {lastAddress?.name && lastAddress?.name != '' && (
                <>
                  <h2 className="text-xl font-semibold text-foreground mb-4 mt-6">
                    Address
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      name:{" "}
                      <span className="ms-2 text-muted-foreground">{lastAddress?.name}</span>
                    </li>
                    {lastAddress?.city && lastAddress?.city != '' && (
                      <li className="flex items-center">
                        city:{" "}
                        <span className="ms-2 text-muted-foreground">{lastAddress?.city}</span>
                      </li>
                    )}
                    {lastAddress?.phone && lastAddress?.phone != '' && (
                      <li className="flex items-center">
                        phone:{" "}
                        <span className="ms-2 text-muted-foreground">{lastAddress?.phone}</span>
                      </li>
                    )}
                  </ul>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ProfilePage