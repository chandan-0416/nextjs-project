export default function Footer() {
    return (
  <div className="flex justify-between bg-black p-8">
    <div className=" mx-3 p-4">
      <h1 className="text-white"> Get real-time insights on audience</h1>
      <h1 className="text-white">growth, follower trends, and potential</h1>
      <h1 className="text-white">clients, all in one place</h1>
      <h1 className="text-white mt-4">Follow Us</h1>
    </div>

    <div className="mt-4">
      <h2 className="text-white">How it works</h2>
      <h2 className="text-white">About</h2>
      <h2 className="text-white">Features</h2>
      <h2 className="text-white">Pricing</h2>
    </div>

    <div className="">
      <h1 className="text-white">Subscribe</h1>
      <h4 className="text-gray-400 mt-2">Join our newsletter to stay up to date on fatures and release.</h4>
      <div className="mt-6">
        <input
         type="email"
         placeholder="Enter your email"
         className="border border-gray-400 placeholder-gray-400 rounded-lg px-16 py-2"/>

       <button className="bg-blue-500 shadow-lg rounded-3xl cursor-pointer hover:bg-blue-600  mx-4 py-2">
          <h1 className="text-white text-center mx-4">Subscribe</h1>
          </button>

      </div>
      <h3 className="text-gray-400 mt-4">By subscribing you agree to with oue Privacy Policy and Provide</h3>
      <h3 className="text-gray-400 ">consent to recieve updates from our company.</h3>
    </div>
    </div>
  )}