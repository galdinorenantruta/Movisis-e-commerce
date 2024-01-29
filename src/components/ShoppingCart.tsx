import React from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Stack } from "react-bootstrap";
import { useCartContext,CartContextType } from "../context/CartContext";
import CartItem from "./CartItem";
import itemsData from '../data/storeData.json'

type CartProps ={
    isOpen:boolean
}

const ShoppingCart = ({isOpen}:CartProps) => {
    const {closeCart, cartItems} = useCartContext() as CartContextType    
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <OffcanvasHeader closeButton>
        <OffcanvasTitle>Cart</OffcanvasTitle>
      </OffcanvasHeader>
      <OffcanvasBody>
        <Stack gap={3}>
            {cartItems.map(item => (
                <CartItem key={item.id} {...item}/>
            ))}
            <div className="ms-auto fw-bold fs-5">
            Total{" $"}
            {
              cartItems.reduce((total, cartItem) => {
                const item = itemsData.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            }
          </div>
        </Stack>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default ShoppingCart;
