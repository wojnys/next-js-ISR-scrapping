import { scrapeWebsiteDetail } from "@/lib/detail-scrape";
import { Product, scrapeWebsite } from "@/lib/scrape";
import React from "react";

interface ProductDetailProps {
    params: {
        productId: string;
    };
}

// export async function generateMetadata({ params }: ProductDetailProps) {
export const revalidate = 60;

const URL = "https://www.medistyle.cz";

export async function generateStaticParams() {
    const products = await scrapeWebsite(URL);

    return products.map((product: Product) => ({
        productId: String(product.id),
    }));
}

export default async function ProductDetail({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;
    console.log("Product ID:", productId);
    const product = await scrapeWebsiteDetail(`${URL}/${productId}`);

    return (
        <main>
            {productId}
            <h1>{product.name}</h1>
            {/* <h1>{product.name}</h1>
            <p>{product.imageUrl}</p> */}
        </main>
    );
}

// const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {
//     return <>{params.productId}</>;
// };

// export default ProductDetail;
