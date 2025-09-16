'use client'
import { Heart, Loader2, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { WishlistProduct } from "@/types/wishlist.t"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { removeFromWishlistHybrid } from "@/redux/wishlistSlice"
import AddBtnCart from "../actionBtns/AddBtnCart"
import Link from "next/link"

const WishlistCard = ({ product }: { product: WishlistProduct }) => {
    const { wishRemove } = useSelector((state: RootState) => state.wishlist)
    const isLoadingRemove = wishRemove.includes(product.id)

    const dispatch = useDispatch<AppDispatch>()

    return (
        <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link href={`/productDetails/${product.id}`}>
                <div className="relative">
                    <Image
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full !h-48 object-cover group-hover:scale-105 transition-transform duration-300 !relative"
                        fill
                    />
                    <div className="absolute top-3 right-3">
                        <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                    </div>
                </div>
            </Link>

            <CardContent className="p-4 space-y-3">
                <div className="space-y-1">
                    <h3 className="font-semibold text-balance leading-tight !text-xl">{product.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-foreground">{product.price}<sub>EGP</sub></span>
                </div>

                <div className="flex gap-2 pt-2 items-center">
                    <AddBtnCart product={product} isHome={true} />
                    <Button disabled={isLoadingRemove} onClick={() => dispatch(removeFromWishlistHybrid(product.id))} variant="outline" size="sm" className="h-9 px-3 bg-transparent cursor-pointer">
                        {isLoadingRemove ? <Loader2 className="animate-spin" /> : <X className="h-4 w-4" />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default WishlistCard