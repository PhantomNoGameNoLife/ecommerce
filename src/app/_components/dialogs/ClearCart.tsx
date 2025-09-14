'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { clearCartHybrid } from "@/redux/cartSlice"
import { AppDispatch } from "@/redux/store"
import { Loader2 } from "lucide-react"

export function ClearCart({ clear , dispatch }: { clear: boolean , dispatch: AppDispatch }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full cursor-pointer">Clear Cart</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        cart and remove all your items from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={clear} onClick={() => dispatch(clearCartHybrid())} className="!bg-red-500 !text-slate-100 cursor-pointer hover:!bg-red-700">{clear ? <Loader2 className="animate-spin" /> : 'Clear'}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}