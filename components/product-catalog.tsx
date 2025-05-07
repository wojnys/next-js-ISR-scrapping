import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Link href={`/products/${productId}`} className="w-full block group">
            <Card className="overflow-hidden group-hover:cursor-pointer">
                <div className="relative">
                    <img src={image || "/placeholder.svg"} alt={name} className="w-full h-48 object-cover" />
                    <Badge className="absolute top-2 right-2">Product</Badge>
                </div>
                <CardHeader>
                    <CardTitle className="h-16 group-hover:underline">{name}</CardTitle>
                    <CardDescription className="h-16">{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{price}</div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default ProductCatalog;
