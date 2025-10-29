import ProductDetail from "./ProductDetail";

async function fetchProductById(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function DetailPage({ params }: { params: { id: string } }) {
  const product = await fetchProductById(params.id);

  // ✅ Pass `product` as a prop
  return <ProductDetail product={product} />;
}



// type Product = {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   brand: string;
//   category: string;
//   thumbnail: string;
// };

// type Props = {
//   params: {
//     id: string;
//   };
// };
// // ✅ Fetch product by ID
// async function fetchProductById(id: string): Promise<Product> {
//   const res = await fetch(`https://dummyjson.com/products/${id}`);
//   if (!res.ok) throw new Error("Failed to fetch product");
//   return res.json();
// }

// // ✅ Product Detail Page
// export default async function DetailPage({ params }: Props) {
//   const product = await fetchProductById(params.id);

//   return (
//     <div className="max-w-5xl mx-auto p-10">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//         {/* 🖼️ Product Image */}
//         <img
//           src={product.thumbnail}
//           alt={product.title}
//           className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
//         />

//         {/* 📝 Product Info */}
//         <div>
//           <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
//           <p className="text-gray-600 mb-4">{product.description}</p>

//           <p className="text-lg text-gray-700">
//             <span className="font-semibold">Brand:</span> {product.brand}
//           </p>
//           <p className="text-lg text-gray-700">
//             <span className="font-semibold">Category:</span> {product.category}
//           </p>

//           <div className="text-2xl font-bold mt-4 mb-6">
//             💰 ${product.price}
//           </div>

//           <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       {/* 🡨 Back Button */}
//       <div className="mt-10">
//         <a
//           href="/product"
//           className="text-blue-600 hover:underline flex items-center gap-2"
//         >
//           ← Back to Products
//         </a>
//       </div>
//     </div>
//   );
// }

