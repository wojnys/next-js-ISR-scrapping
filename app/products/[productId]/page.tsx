import { scrapeWebsiteDetail } from "@/lib/detail-scrape";
import { type Product, scrapeWebsite } from "@/lib/scrape";
import Image from "next/image";
import { Suspense } from "react";
import { ShoppingCart, Heart, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductDetailProps {
    params: {
        productId: string;
    };
}

export const revalidate = 3660;

const URL = "https://www.medistyle.cz";

export async function generateStaticParams() {
    const products = await scrapeWebsite(URL);

    return products.map((product: Product) => ({
        productId: String(product.id),
    }));
}

function ProductDetailSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <Skeleton className="h-[400px] w-full rounded-lg" />
                    <div className="flex gap-2">
                        <Skeleton className="h-20 w-20 rounded-md" />
                        <Skeleton className="h-20 w-20 rounded-md" />
                        <Skeleton className="h-20 w-20 rounded-md" />
                    </div>
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </div>
    );
}

export default async function ProductDetail({ params }: ProductDetailProps) {
    const { productId } = params;

    return (
        <main className="container mx-auto px-4 py-8">
            <Link href="/" className="flex items-center text-muted-foreground mb-6 hover:text-primary transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to products
            </Link>

            <Suspense fallback={<ProductDetailSkeleton />}>
                <ProductContent productId={productId} />
            </Suspense>
        </main>
    );
}

async function ProductContent({ productId }: { productId: string }) {
    const product = await scrapeWebsiteDetail(`${URL}/${productId}`);

    if (!product) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <p className="mt-2 text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
                <Button asChild className="mt-4">
                    <Link href="/">Return to homepage</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <Card className="overflow-hidden border-0 shadow-none">
                    <CardContent className="p-0">
                        <div className="relative aspect-square">
                            <Image
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover rounded-lg"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex gap-2 overflow-x-auto pb-2">
                    <button className="border-2 border-primary rounded-md overflow-hidden">
                        <div className="relative w-20 h-20">
                            <Image src={product.imageUrl || "/placeholder.svg"} alt={product.name} fill className="object-cover" sizes="80px" />
                        </div>
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <Badge className="mb-2">In Stock</Badge>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-2xl font-semibold mt-2">{product.price}</p>
                </div>

                <div className="prose max-w-none">
                    <p>{product.description}</p>
                </div>

                <Separator />

                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button className="flex-1" size="lg">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                        </Button>
                        <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                            <Heart className="mr-2 h-4 w-4" />
                            Wishlist
                        </Button>
                        <Button variant="outline" size="icon" className="hidden sm:flex">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <Separator />

                <Tabs defaultValue="details">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="info">Info</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="font-medium">SKU</div>
                            <div>{productId}</div>
                            <div className="font-medium">Category</div>
                            <div>Medical Supplies</div>
                            <div className="font-medium">Material</div>
                            <div>Premium Quality</div>
                        </div>
                    </TabsContent>
                    <TabsContent value="info" className="space-y-4 mt-4">
                        <p className="text-sm">Additial info ...</p>
                        <p className="text-sm">Additial info ...</p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
