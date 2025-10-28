"use client";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function MainPage(){
      const router = useRouter();
    return (
        <div>
       <span className="flex items-center justify-center">
  <button className="  bg-white shadow-lg rounded-3xl cursor-pointer mt-4 p-2">
        <h1 className="text-center text-black mx-4">Instant Invoicing</h1>
      </button>
    </span>

  <h1 className="text-4xl text-center mt-6">Track, Analyze, and Grow Your</h1>
  <h1 className="text-4xl text-center mx-2">Social Media with Ease</h1>
  <h4 className="text-center mt-4">Get real-time insight on audience growth, follower</h4>
  <h4 className="text-center mx-2"> trends, and potential clients, all in one place</h4>

  <Suspense fallback={<p>Loading product list...</p>}>
  <span className="flex items-center justify-center mt-6">
     <button 
     onClick={() => router.push("/product")}
     className=" text-white bg-blue-500 shadow-lg rounded-3xl cursor-pointer hover:bg-blue-600 p-2">
        <h1 className="text-center text-white mx-4">Show your Products</h1>
      </button>
    </span>
 </Suspense>

 <h1 className=" text-4xl text-black text-center mt-16">Customer testimonials</h1>
 <h4 className="text-center mt-2">Neque porro quisquam est qui dolorem quasar.</h4>
 
 <div className="flex justify-center mt-6">
  <div className="grid grid-cols-3 gap-x-6 p-6">
  <div className="w-60 h-60 bg-white text-black p-6 rounded-lg">Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.</div>
  <div className="w-60 h-80 bg-white text-black p-6 rounded-lg">Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.Depending on your goal this could range from a simple model demonstrating the principles of rocket flight.</div>
  <div className="w-60 h-60 bg-white text-black p-6 rounded-lg">Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.</div>
  <div className="w-60 h-60 bg-white text-black p-6 rounded-lg">Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.</div>
  <div className="w-60 h-60 bg-white text-black p-6 rounded-lg mt-16">Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.</div>
  <div className="w-60 h-60 bg-white text-black p-6 rounded-lg">Creating a simulation of rocket architecture involves multiple components that simulate the physical aerodynamic and control systems of a rocket.</div>
</div>
 </div>
        </div>
 )
}