import React from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Stack } from "react-bootstrap";
import { useCartContext,CartContextType } from "../context/CartContext";
import CartItem from "./CartItem";

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
        </Stack>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default ShoppingCart;
