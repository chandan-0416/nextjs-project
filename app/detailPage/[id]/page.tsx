import React from "react";
import ProductDetail from "./ProductDetail";

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
};

async function fetchProductById(id: number): Promise<Product> {
  console.log("Fetching product ID:", id);

  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: number }>; 
}) {
  
  const { id } = await params;
  const product = await fetchProductById(id);

  return <ProductDetail product={product} />;
}