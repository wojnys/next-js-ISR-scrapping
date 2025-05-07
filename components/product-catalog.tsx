import { ShoppingCart } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from "react";
import Link from "next/link";

interface ProductCatalogProps {
    productId: string;
    name: string;
    description: string;
    price: number | string;
    image: string;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ productId, name, description, price, image }) => {
    return (
        <div className="w-full">
            <Card className="overflow-hidden">
                <div className="relative">
                    <img src={image || "/placeholder.svg"} alt={name} className="w-full h-48 object-cover" />
                    <Badge className="absolute top-2 right-2">Produkt</Badge>
                </div>
                <CardHeader>
                    <CardTitle className="h-16">{name}</CardTitle>
                    <CardDescription className="h-16">{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{price}</div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Link href={`/products/${productId}`} className="text-sm text-muted-foreground bg-slate-800 px-4 py-2 rounded-full text-white">
                        View Details
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProductCatalog;
