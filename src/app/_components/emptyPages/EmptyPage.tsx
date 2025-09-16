import { Heart, Package, ShoppingBag, ShoppingBasket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const EmptyPage = ({text}:{text:string}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="relative mb-8">
                <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
                    {text === 'Continue Shopping' && <ShoppingBasket className="h-16 w-16 text-muted-foreground" />}
                    {text === 'Browse Products' && <Heart className="h-16 w-16 text-muted-foreground" />}
                    {text === 'Start Shopping' &&  <Package className="h-16 w-16 text-muted-foreground" />}
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-primary-foreground" />
                </div>
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Your wishlist is empty!</h2>
            <p className="text-muted-foreground text-lg mb-8 text-center max-w-md text-pretty">
                {"Start adding items you love and we'll save them here for you to purchase later."}
            </p>

            <Link href="/">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    {text}
                </Button>
            </Link>
        </div>
    )
}

export default EmptyPage