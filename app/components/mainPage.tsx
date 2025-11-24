// "use client";
// import { useRouter } from "next/navigation";

// export default function MainPage() {
//   const router = useRouter();
//   return (
//     <div className="mt-15 px-4">

//       {/* Small Top Button */}
//       <div className="flex items-center justify-center">
//         <button className="bg-white shadow-lg rounded-3xl cursor-pointer mt-4 p-2">
//           <h1 className="text-black mx-4">Instant Invoicing</h1>
//         </button>
//       </div>

//       {/* Headings */}
//       <h1 className="text-3xl md:text-5xl text-center mt-6 font-semibold">
//         Track, Analyze, and Grow Your
//       </h1>
//       <h1 className="text-3xl md:text-5xl text-center mx-2 font-semibold">
//         Social Media with Ease
//       </h1>

//       {/* Subheading */}
//       <p className="text-center mt-4 text-sm md:text-base">
//         Get real-time insight on audience growth, follower
//       </p>
//       <p className="text-center mx-2 text-sm md:text-base">
//         trends, and potential clients, all in one place
//       </p>

//       {/* CTA Button */}
//       <div className="flex items-center justify-center mt-6">
//         <button
//           onClick={() => router.push("/product")}
//           className="text-white bg-blue-500 shadow-lg rounded-3xl cursor-pointer hover:bg-blue-600 p-2"
//         >
//           <span className="mx-4 text-white">Show your Products</span>
//         </button>
//       </div>

//       {/* Testimonials Section */}
//       <h1 className="text-3xl md:text-4xl font-semibold text-black text-center mt-16">
//         Customer Testimonials
//       </h1>
//       <p className="text-center mt-2">Neque porro quisquam est qui dolorem quasar.</p>

//       {/* Testimonials Grid */}
//       <div className="flex justify-center mt-6">
//         <div className="
//           grid 
//           grid-cols-1 
//           sm:grid-cols-2 
//           md:grid-cols-3 
//           gap-6 
//           p-4
//           max-w-6xl
//         ">

//           <div className="bg-white text-black p-6 rounded-lg">
//             Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.
//           </div>

//           <div className="bg-white text-black p-6 rounded-lg">
//             Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket. Depending on your goal this could range from a simple model demonstrating the principles of rocket flight.
//           </div>

//           <div className="bg-white text-black p-6 rounded-lg">
//             Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.
//           </div>

//           <div className="bg-white text-black p-6 rounded-lg">
//             Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.
//           </div>

//           <div className="bg-white text-black p-6 rounded-lg">
//             Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.
//           </div>

//           <div className="bg-white text-black p-6 rounded-lg">
//             Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();
  return (
    <div className="mt-15 px-4 md:px-10 lg:px-20">
      {/* Top Tag Button */}
      <div className="flex items-center justify-center">
        <button className="bg-white shadow-md hover:shadow-xl transition-all rounded-3xl mt-4 py-2 px-6 border border-gray-200">
          <h1 className="text-black font-medium tracking-wide">Instant Invoicing</h1>
        </button>
      </div>

      {/* Hero Section */}
      <div className="text-center mt-10 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Track, Analyze, and Grow Your
        </h1>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Social Media with Ease
        </h1>

        <p className="mt-5 text-gray-600 text-sm md:text-lg">
          Get real-time insights on audience growth, follower trends,
        </p>
        <p className="text-gray-600 text-sm md:text-lg">
          and potential clients — all in one powerful dashboard.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => router.push("/product")}
            className="text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl rounded-full cursor-pointer py-3 px-8 text-lg font-medium"
          >
            Show Your Products
          </button>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-24 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Customer Testimonials</h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base max-w-xl mx-auto">
          What our customers say about their experience.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="flex justify-center mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 max-w-6xl">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white text-gray-800 p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all text-sm leading-relaxed"
              >
                Creating a simulation of rocket architecture involves multiple components that simulate physical aerodynamic and control systems. This helps in demonstrating core principles effectively.
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

