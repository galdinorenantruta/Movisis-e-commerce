import React, { useState } from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Stack, Button, Alert } from "react-bootstrap";
import { useCartContext, CartContextType } from "../context/CartContext";
import CartItem from "./CartItem";
import itemsData from '../data/storeData.json';

type CartProps = {
  isOpen: boolean
}

const ShoppingCart = ({ isOpen }: CartProps) => {
  const { closeCart, cartItems, clearCart } = useCartContext() as CartContextType;
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const handleClearCart = () => {
    clearCart();
    
    setPurchaseSuccess(true); 
  };

  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <OffcanvasHeader closeButton>
        <OffcanvasTitle>Cart</OffcanvasTitle>
      </OffcanvasHeader>
      <OffcanvasBody>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" $"}
            {
              cartItems.reduce((total, cartItem) => {
                const item = itemsData.find(i => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            }
          </div>
          <Button variant="danger" onClick={handleClearCart}>Finalizar Compra</Button> 
          {purchaseSuccess && (
            <Alert variant="success" onClose={() => setPurchaseSuccess(false)} dismissible>
              Compra efetuada com sucesso!
            </Alert>
          )}
        </Stack>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default ShoppingCart;
