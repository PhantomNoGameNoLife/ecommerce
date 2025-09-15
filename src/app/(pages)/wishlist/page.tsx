'use client'
import EmptyWishList from "@/app/_components/emptyPages/EmptyWishlist"
import WishlistSkeleton from "@/app/_components/skeleton/WishlistSkeleton"
import WishlistCard from "@/app/_components/wishlistCard/WishlistCard"
import { RootState } from "@/redux/store"
import { WishlistProduct } from "@/types/wishlist.t"
import { useSelector } from "react-redux"

const Wishlist = () => {
    const { wishLoading, count, data } = useSelector((state: RootState) => state.wishlist)

    if (wishLoading) return <WishlistSkeleton />

    if (count === 0) {
        return <EmptyWishList />
    }

    return (
        <section className="bg-background py-8 antialiased md:py-16 mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 className="text-2xl font-semibold text-foreground mb-3">My Wishlist</h2>
            <p className="text-lg font-semibold text-foreground mb-6">Total items: {count} </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {data.map((product: WishlistProduct) => (
                    <WishlistCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}

export default Wishlist