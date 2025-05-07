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
            <main className="flex-1">
                <section id="products" className="w-full py-12">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Product Catalog</h2>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Medisys products</p>
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
