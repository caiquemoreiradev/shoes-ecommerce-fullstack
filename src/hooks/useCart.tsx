import { useContext } from "react";
import { CartContext, CartContextData } from "../contexts/cart";

export function useCart(): CartContextData {
    const context = useContext(CartContext);
  
    return context;
  }