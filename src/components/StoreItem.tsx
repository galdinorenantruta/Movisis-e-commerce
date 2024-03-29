import { Button, Card } from "react-bootstrap"
import { useCartContext } from "../context/CartContext"
import { CartContextType } from "../context/CartContext"

type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
    entryDate:string
  }
  
  export function StoreItem({ id, name, price, imgUrl, entryDate }: StoreItemProps) {
    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useCartContext() as CartContextType
    const quantity = getItemQuantity(id)

    return (
      <Card className="h-100">
        <Card.Img variant="top" src={imgUrl} height="200px" style={{ objectFit: "cover" }}/>
        <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">${price}</span>
         
        </Card.Title>
        <span className="ms-2 text-muted">Data de Entrada:{" "}{entryDate}</span>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center fl   ex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
        </Card.Body>
      </Card>
    );
  }