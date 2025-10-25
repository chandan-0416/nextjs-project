// export default function DetailPage() {
//   return (
//     <div> 
//        <h1>
//         Detail Page .....
//          </h1>
//        </div>
//   )}

import Image from "next/image";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
  rating: number;
  stock: number;
};

// Fetch single product data
async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProductById(params.id);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 border rounded-lg shadow">
      <div className="grid md:grid-cols-2 gap-8">
        {/* 🖼️ Product Image */}
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={500}
          height={400}
          className="rounded-lg object-cover"
          unoptimized
        />

        {/* 📄 Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-3">{product.description}</p>
          <p className="text-indigo-600 font-semibold text-xl mb-2">
            ${product.price}
          </p>
          <p className="text-yellow-500 mb-2">⭐ {product.rating}</p>
          <p className="text-sm text-gray-500">
            Brand: <span className="font-semibold">{product.brand}</span>
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Category: <span className="font-semibold">{product.category}</span>
          </p>

          <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
