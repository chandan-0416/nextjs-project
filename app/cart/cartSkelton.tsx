import React from "react";

const CartSkeleton = () => {
  return (
    <div className="p-4 animate-pulse space-y-4">
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>

      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center space-x-4 border p-3 rounded-lg"
          >
            <div className="w-16 h-16 bg-gray-300 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-5 bg-gray-300 rounded w-1/4"></div>
    </div>
  );
};

export default CartSkeleton;
