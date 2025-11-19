export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="
        max-w-7xl mx-auto 
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        gap-10
      ">
        
        {/* Column 1 */}
        <div className="mx-3">
          <h1 className="text-white">Get real-time insights on audience</h1>
          <h1 className="text-white">growth, follower trends, and potential</h1>
          <h1 className="text-white">clients, all in one place</h1>

          <h1 className="text-white mt-6 font-semibold">Follow Us</h1>
        </div>

        {/* Column 2 */}
        <div className="space-y-2">
          <h2 className="text-white font-semibold">How it works</h2>
          <h2 className="text-white">About</h2>
          <h2 className="text-white">Features</h2>
          <h2 className="text-white">Pricing</h2>
        </div>

        {/* Column 3 */}
        <div>
          <h1 className="text-white font-semibold">Subscribe</h1>
          <h4 className="text-gray-400 mt-3">
            Join our newsletter to stay up to date on features and releases.
          </h4>

          {/* Input + Button */}
          <div className="flex flex-col sm:flex-row mt-6 gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="
                border border-gray-400 
                placeholder-gray-400 
                rounded-lg 
                px-4 py-2 
                w-full
              "
            />

            <button className="bg-blue-500 shadow-lg rounded-3xl cursor-pointer hover:bg-blue-600 px-6 py-2">
              <span className="text-white">Subscribe</span>
            </button>
          </div>

          <p className="text-gray-400 mt-4 text-sm">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>

      </div>
    </footer>
  );
}
