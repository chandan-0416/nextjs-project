"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react"; //ReactNode represents everything that can be rendered.

type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load from localStorage when app starts
    useEffect(() => {
      const savedInLocalStorage = localStorage.getItem("cart");
      if (savedInLocalStorage) setCartItems(JSON.parse(savedInLocalStorage)); //  Convert JSON string to actual array object
    },[])

    // Save to localStorage whenever cart changes
    useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);


  // Add item only once — ignore if already exists
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) { 
        return prev.map((i)=> 
        i.id === item.id ? {...i, quantity: item.quantity } : item
      );
    }
      return [...prev, item]
    });
  };
  // console.log(cartItems);

  // Remove item completely
  const removeFromCart = (id: number) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));

  //  Increment quantity
  const incrementQuantity = (id: number) =>
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );

  // Decrement quantity (min = 1)
  const decrementQuantity = (id: number) =>
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
      )
    );

  //  Clear entire cart
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};