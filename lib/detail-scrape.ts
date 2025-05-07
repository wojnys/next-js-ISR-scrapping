import axios from "axios";
import * as cheerio from "cheerio";
import { Product } from "./scrape";

export async function scrapeWebsiteDetail(url: string): Promise<Product> {
    try {
        // Fetch the HTML
        const { data: html } = await axios.get(url);

        // Load the HTML into Cheerio
        const $ = cheerio.load(html);

        const name = $("h1").first().text().trim();

        const imageUrl = $(".p-image img").attr("src") ?? "#";

        const description = $(".p-short-description").text().trim();

        const price = $(".price-final .price-final-holder").last().text().trim();

        const product: Product = {
            id: url.split("/").pop() || "",
            imageUrl,
            name,
            description,
            price,
        };

        return product;
    } catch (error) {
        console.error("Error scraping the website:", error);
        throw error;
    }
}
