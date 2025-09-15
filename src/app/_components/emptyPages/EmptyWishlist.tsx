import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

const EmptyWishList = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="relative mb-8">
                <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
                    <Heart className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-primary-foreground" />
                </div>
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Your wishlist is empty!</h2>
            <p className="text-muted-foreground text-lg mb-8 text-center max-w-md text-pretty">
                {"Start adding items you love and we'll save them here for you to purchase later."}
            </p>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Browse Products
            </Button>
        </div>
    )
}

export default EmptyWishList