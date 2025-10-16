//import Image from "next/image";

type Product = {
  id: number;
  title: string;
  availabilityStatus: string;
  description: string;
  category: string;
  brand: string;
  thumbnail: string;
  price: number;
  rating: number;
  returnPolicy: string;
  stock: number;
  images: string;
};

type ProductResponse = {
  products: Product[];
};

export default async function ProductsPage() {
  const res = await fetch("https://dummyjson.com/products", {
    next: { revalidate: 20 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductResponse = await res.json();
 console.log(data);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products({data.products.length})</h1>
      <div className="grid grid-cols-3 gap-6">
        {data.products.map((products) => (
          <div
            key={products.id}
            className="border rounded-lg p-4"
          >
            <div className="">
            <h1 className="text-black text-2xl">{products.id}  {products.title}</h1>
            </div>
            <h1 className="text-left mt-2">{products.description}</h1>
            <h1 className="text-2xl text-indigo-600 mt-2">{products.category}</h1>
           
            {/* <Image 
              src={products.images}
              alt={products.title}
              className="w-full h-40 object-cover rounded-lg"
            /> */}
            
            <p className="text-red-400 text-sm">{products.rating}</p>
            <p className="text-gray-600 text-sm">{products.stock}</p>
            <p className="text-gray-600 text-sm">{products.returnPolicy}</p>
            <p className="text-gray-600 text-sm">${products.price}</p>

          </div>
        ))}
      </div>
    </div>
  );
}



