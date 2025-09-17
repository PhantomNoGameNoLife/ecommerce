import { Heart, Package, ShoppingBag, ShoppingBasket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type EmptyType = "Continue Shopping" | "Browse Products" | "Start Shopping"

const emptyConfig: Record<EmptyType, {
    icon: React.ReactNode
    label: string
    message: string
}> = {
    "Continue Shopping": {
        icon: <ShoppingBasket className="h-16 w-16 text-muted-foreground" />,
        label: "cart",
        message:
            "Start adding items to your cart and we'll save them here for you to purchase later.",
    },
    "Browse Products": {
        icon: <Heart className="h-16 w-16 text-muted-foreground" />,
        label: "wishlist",
        message:
            "Save the products you love to your wishlist and revisit them anytime.",
    },
    "Start Shopping": {
        icon: <Package className="h-16 w-16 text-muted-foreground" />,
        label: "orders",
        message:
            "You haven't placed any orders yet. Start shopping and track them here.",
    },
}

const EmptyPage = ({ text }: { text: EmptyType }) => {
    const config = emptyConfig[text]

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="relative mb-8">
                <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
                    {config.icon}
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-primary-foreground" />
                </div>
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
                Your {config.label} is empty!
            </h2>

            <p className="text-muted-foreground text-lg mb-8 text-center max-w-md text-pretty">
                {config.message}
            </p>

            <Link href="/">
                <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    {text}
                </Button>
            </Link>
        </div>
    )
}

export default EmptyPage