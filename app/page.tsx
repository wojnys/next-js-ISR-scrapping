import Link from "next/link";

import { Button } from "@/components/ui/button";
import ProductCatalog from "@/components/product-catalog";

import { Product, scrapeWebsite } from "@/lib/scrape";
import { scrapeWebsiteDetail } from "@/lib/detail-scrape";

export const revalidate = 3600; // invalidate every hour

export default async function Home() {
    const products: Product[] = await scrapeWebsite("https://www.medistyle.cz");

    const product = await scrapeWebsiteDetail("https://www.medistyle.cz/losa-seda/");
    console.log("Product Details:", product);

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-xl">WebProducts</span>
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
                            Features
                        </Link>
                        <Link href="#products" className="text-sm font-medium transition-colors hover:text-primary">
                            Products
                        </Link>
                        <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
                            Pricing
                        </Link>
                        <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
                            Contact
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" className="hidden md:flex">
                            Log in
                        </Button>
                        <Button size="sm">Get Started</Button>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <section id="products" className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Product Catalog</h2>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    Browse our selection of premium web products designed to help you succeed online.
                                </p>
                            </div>
                        </div>

                        {products.length > 0 ? (
                            <div className="container mx-auto px-4 py-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {products.map((product: any, index: number) => (
                                        <ProductCatalog
                                            name={product.name}
                                            description={product.description}
                                            price={product.price}
                                            image={product.imageUrl}
                                            key={product.name}
                                            productId={product.id}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-screen">
                                <p className="text-lg">Loading products...</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
