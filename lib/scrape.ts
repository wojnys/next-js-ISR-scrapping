import axios from "axios";
import * as cheerio from "cheerio";

export interface Product {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    price: string;
}

export async function scrapeWebsite(url: string) {
    const products: Product[] = [];

    try {
        // Fetch the HTML content of the webpage
        const { data: html } = await axios.get(url);

        // Load the HTML into Cheerio
        const $ = cheerio.load(html);

        $(".product").each((index, element) => {
            const product = $(element);

            // I need to remo "/ "  slashes from id
            const id = product.find(".p-tools a").attr("href")?.replaceAll("/", "").trim() ?? "";
            const imageUrl =
                product.find("a.image img").attr("data-src") ??
                product.find("a.image img").attr("data-micro-image") ??
                product.find("a.image img").attr("src") ??
                "#";

            const name = product.find('a.name span[data-testid="productCardName"]').text().trim();

            const description = product.find('p[data-testid="productCardShortDescr"]').text().trim();

            const price = product.find('div[data-testid="productCardPrice"] strong').text().replace(/\s+/g, " ").trim();

            products.push({ id, imageUrl, name, description, price });
        });

        console.log(products);

        return products;
    } catch (error) {
        console.error("Error scraping the website:", error);
        throw error;
    }
}
