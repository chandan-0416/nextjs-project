// app/api/products/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch data from DummyJSON (external API)
    const res = await fetch("https://dummyjson.com/products?limit=100");

    if (!res.ok) {
      throw new Error("Failed to fetch data from DummyJSON");
    }

    const data = await res.json();
    console.log(data);
    

    // Return products as API response
    return NextResponse.json(data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to load products" },
      { status: 500 }
    );
  }
}