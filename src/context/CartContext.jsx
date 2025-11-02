import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const handleQuantityChange = (itemName, change, shopName, price) => {
    const key = `${shopName}::${itemName}`;
    setCart((prevCart) => {
      const currentQty = prevCart[key]?.qty || 0;
      const newQty = Math.max(currentQty + change, 0);

      if (newQty === 0) {
        const updated = { ...prevCart };
        delete updated[key];
        return updated;
      }

      return {
        ...prevCart,
        [key]: {
          qty: newQty,
          itemName,
          shopName,
          price: price !== undefined ? price : prevCart[key]?.price || 0,
        },
      };
    });
  };

  const clearCart = () => setCart({});

  const checkout = () => {
    // Simulate API call or save to DB here
    console.log("Order placed ✅", cart);

    // Optional: Save order in localStorage or backend
    localStorage.setItem("lastOrder", JSON.stringify(cart));

    // Clear the cart after checkout
    clearCart();
  };

  return (
    <CartContext.Provider value={{ cart, setCart, handleQuantityChange, clearCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
