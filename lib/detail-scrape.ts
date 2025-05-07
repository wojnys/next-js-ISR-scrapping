import axios from "axios";
import * as cheerio from "cheerio";

export interface Product {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    price: string;
}

export async function scrapeWebsiteDetail(url: string) {
    try {
        // Fetch the HTML content of the webpage
        const { data: html } = await axios.get(url);

        // Load the HTML into Cheerio
        const $ = cheerio.load(html);

        // Product name
        const name = $("h1").first().text().trim();

        // Image URL
        const image = $(".p-image img").attr("src");

        // Description
        const description = $(".p-short-description").text().trim();

        // Price
        const price = $(".price-final .price-final-holder").text().trim();

        // Availability (first visible span with class "availability-label")
        const availability = $(".availability-label.skladem").first().text().trim();

        console.log("Product Details:", {
            name,
            image,
            description,
            price,
            availability,
        });

        return {
            name,
            image,
            description,
            price,
            availability,
        };
    } catch (error) {
        console.error("Error scraping the website:", error);
        throw error;
    }
}
