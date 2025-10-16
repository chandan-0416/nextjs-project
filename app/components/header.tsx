import Image from "next/image"

export default function Header() {
  return (
  <div className="flex items-center justify-between bg-gradient-to-b from-blue-100 to-blue-200">
         <div className=" flex gap-2 px-8">
          <div className="h-6 w-6 overflow-hidden">
             <Image src="/images/icon1.png" alt="" width={100} height={100} className="object-cover"/>
          </div>
         
        <h1>TrendTide</h1>
          </div>
         <div className="flex">
          <button className="mx-4 px-3">How It Works</button>
          <button className="mx-4 px-3">About Us</button>
          <button className="mx-4 px-3">Features</button>
          <button className="mx-4 px-3">Pricing</button>
      </div>
  <div className="p-8">
    <button className=" bg-blue-500 shadow-lg rounded-3xl cursor-pointer hover:bg-blue-600 p-2"> 
      <h1 className="text-center text-white mx-4">Book the demo</h1></button>
   </div>
</div>
    
  )
 }