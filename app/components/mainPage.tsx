"use client";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();
  return (
    <div className="mt-15 px-4">

      {/* Small Top Button */}
      <div className="flex items-center justify-center">
        <button className="bg-white shadow-lg rounded-3xl cursor-pointer mt-4 p-2">
          <h1 className="text-black mx-4">Instant Invoicing</h1>
        </button>
      </div>

      {/* Headings */}
      <h1 className="text-3xl md:text-5xl text-center mt-6 font-semibold">
        Track, Analyze, and Grow Your
      </h1>
      <h1 className="text-3xl md:text-5xl text-center mx-2 font-semibold">
        Social Media with Ease
      </h1>

      {/* Subheading */}
      <p className="text-center mt-4 text-sm md:text-base">
        Get real-time insight on audience growth, follower
      </p>
      <p className="text-center mx-2 text-sm md:text-base">
        trends, and potential clients, all in one place
      </p>

      {/* CTA Button */}
      <div className="flex items-center justify-center mt-6">
        <button
          onClick={() => router.push("/product")}
          className="text-white bg-blue-500 shadow-lg rounded-3xl cursor-pointer hover:bg-blue-600 p-2"
        >
          <span className="mx-4 text-white">Show your Products</span>
        </button>
      </div>

      {/* Testimonials Section */}
      <h1 className="text-3xl md:text-4xl font-semibold text-black text-center mt-16">
        Customer Testimonials
      </h1>
      <p className="text-center mt-2">Neque porro quisquam est qui dolorem quasar.</p>

      {/* Testimonials Grid */}
      <div className="flex justify-center mt-6">
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          gap-6 
          p-4
          max-w-6xl
        ">

          <div className="bg-white text-black p-6 rounded-lg">
            Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.
          </div>

          <div className="bg-white text-black p-6 rounded-lg">
            Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket. Depending on your goal this could range from a simple model demonstrating the principles of rocket flight.
          </div>

          <div className="bg-white text-black p-6 rounded-lg">
            Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.
          </div>

          <div className="bg-white text-black p-6 rounded-lg">
            Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.
          </div>

          <div className="bg-white text-black p-6 rounded-lg">
            Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.
          </div>

          <div className="bg-white text-black p-6 rounded-lg">
            Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.
          </div>

        </div>
      </div>
    </div>
  );
}
