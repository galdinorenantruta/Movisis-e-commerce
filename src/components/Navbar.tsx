import React from "react";
import { ImCart } from "react-icons/im";
import {
  Container,
  Nav,
  Navbar as BootstrapNavbar,
  Button,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCartContext, CartContextType } from "../context/CartContext"

const Navbar = () => {
  const { openCart, cartQuantity } = useCartContext() as CartContextType

  return (
    <BootstrapNavbar sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto ">
          <NavLink to={"/home"}>Home</NavLink>
          <NavLink className="mx-4"to={"/about"}>About</NavLink>
          <NavLink className="mx-2" to={"/"}>Store</NavLink>
        </Nav>
        
           <Button
           onClick={openCart}
             style={{ width: "3rem", height: "3rem", position: "relative" }}
             variant="outline-primary"
             className="rounded-circle"
           >
             <ImCart />
             <div
                 className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                 style={{
                   color: "white",
                   width: "1.5rem",
                   height: "1.5rem",
                   position: "absolute",
                   bottom: 0,
                   right: 0,
                   transform: "translate(25%, 25%)",
                 }}
               >
                 
             {cartQuantity}
               </div>
           </Button>
   
       
       
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
