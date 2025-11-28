"use client";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function MainPage() {
const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

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

