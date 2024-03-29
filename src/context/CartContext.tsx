import { createContext, useContext, ReactNode, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartProviderProps = {
    children: ReactNode
  } 
  type CartItem = {
    id: number
    quantity: number
  }

  export type CartContextType = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    clearCart: () => void
    cartQuantity: number
    cartItems: CartItem[]
  }

const CartContext = createContext({})

export function useCartContext(){
    return useContext(CartContext)
}

export function CartProvider({children}: CartProviderProps){   
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] =useLocalStorage<CartItem[]>("shopping-cart",[])
    console.log(isOpen)
    const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
    
  const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
      )

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0
      }

      function increaseCartQuantity(id: number) {
        setCartItems(currItems => {
          if (currItems.find(item => item.id === id) == null) {
            return [...currItems, { id, quantity: 1 }]
          } else {
            return currItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }
              } else {
                return item
              }
            })
          }
        })
      }
      function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
          if (currItems.find(item => item.id === id)?.quantity === 1) {
            return currItems.filter(item => item.id !== id)
          } else {
            return currItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity - 1 }
              } else {
                return item
              }
            })
          }
        })
      }
      function removeFromCart(id: number) {
        setCartItems(currItems => {
          return currItems.filter(item => item.id !== id)
        })
      }

      function clearCart() {
        setCartItems([]); 
      }

    return(
        <CartContext.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, clearCart, cartItems, cartQuantity, openCart, closeCart}}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </CartContext.Provider>
    )

}