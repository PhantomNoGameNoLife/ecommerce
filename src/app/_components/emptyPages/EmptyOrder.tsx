import { ShoppingBag, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

const EmptyOrders = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="relative mb-8">
                <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center">
                    <Package className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-primary-foreground" />
                </div>
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">You have no orders yet!</h2>
            <p className="text-muted-foreground text-lg mb-8 text-center max-w-md text-pretty">
                {"Browse our products and place your first order. We'll show it here once it's confirmed."}
            </p>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Start Shopping
            </Button>
        </div>
    )
}

export default EmptyOrders