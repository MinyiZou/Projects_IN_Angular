export class Product {
    id: number = 0;
    name: string = "";
    price: number = 0;
    image_url: string = "";
    
}

export enum SortOptions {
    HighToLow = "high2low",
    LowToHigh = "low2high",
    None = ""
}