import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart((prevState) => [...prevState, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const productInCartIndex = cart.findIndex((item) => item.id === productId);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      if (newCart[productInCartIndex].quantity > 1) {
        newCart[productInCartIndex].quantity -= 1;
        setCart(newCart);
      } else {
        setCart((prevState) => prevState.filter((item) => item.id !== productId));
      }
    }
  };

  const removeProductFromCart = (productId) => {
    setCart((prevState) => prevState.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeProductFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
