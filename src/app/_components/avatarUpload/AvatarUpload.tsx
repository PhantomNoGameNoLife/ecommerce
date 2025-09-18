"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import { UploadButton } from "@/utilities/uploadthing"

export function AvatarUpload({ onUpload }: { onUpload: (url: string, key: string) => void }) {
    const { data } = useSelector((state: RootState) => state.user)
    const [preview, setPreview] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (data?.addresses?.length) {
            const latestDetails = data.addresses[data.addresses.length - 1]?.details;
            if (latestDetails?.startsWith("http")) {
                setPreview(latestDetails);
            } else {
                setPreview(undefined);
            }
        } else {
            setPreview(undefined);
        }
    }, [data]);

    return (
        <div className="flex flex-col items-center gap-3">
            {preview?.startsWith("http") ? (
                <Image
                    src={preview}
                    alt="avatar"
                    width={120}
                    height={120}
                    className="rounded-full object-cover size-[120px]"
                />
            ) : (
                <div className="size-[120px] mx-auto mb-4 rounded-full flex items-center justify-center bg-foreground text-primary-foreground border-4 border-primary overflow-hidden">
                    <span className='select-none font-bold text-6xl antialiased font-mono'>{data?.name.charAt(0).toUpperCase()}</span>
                </div>
            )}

            <UploadButton
                appearance={{
                    button: "ut-button",
                    container: "ut-container",
                    allowedContent: "ut-allowed",
                }}
                content={{
                    allowedContent: "Only images (png, jpg, jpeg, webp)",
                }}
                endpoint="avatar"
                onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                        setPreview(res[0].ufsUrl)
                        onUpload(res[0].ufsUrl, res[0].key)
                    }
                }}
                onUploadError={(err) => {
                    toast.error(`❌ Upload failed: ${err.message}`)
                }}
            />
        </div>
    )
}