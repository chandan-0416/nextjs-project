// "use client";

// export default function ProductSkeleton() {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 animate-pulse">
//       {Array.from({ length: 8 }).map((_, i) => (
//         <div key={i} className="border rounded-lg p-3 space-y-3">
//           <div className="bg-gray-300 h-40 w-full rounded-md"></div>
//           <div className="h-4 bg-gray-300 rounded w-3/4"></div>
//           <div className="h-4 bg-gray-300 rounded w-1/2"></div>
//           <div className="h-6 bg-gray-300 rounded w-1/3"></div>
//         </div>
//       ))}
//     </div>
//   );
// }




"use client";

export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 animate-pulse">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="border rounded-xl shadow-sm p-4 bg-white flex flex-col space-y-3"
        >
          {/* 🖼️ Image Placeholder */}
          <div className="bg-gray-300 h-48 w-full rounded-lg"></div>

          {/* 🧾 Title */}
          <div className="h-5 bg-gray-300 rounded w-3/4"></div>

          {/* 💲 Price + Rating */}
          <div className="flex items-center justify-between mt-2">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>

          {/* 📦 Category Tag */}
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
