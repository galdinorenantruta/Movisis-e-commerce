import { Button, Stack } from "react-bootstrap"
import { CartContextType, useCartContext } from "../context/CartContext"
import ItemsData from '../data/storeData.json'


type ItemProps = {
    id: number
    quantity: number
}
const CartItem = ({id, quantity}: ItemProps) => {
    const {removeFromCart} = useCartContext() as CartContextType
    const item = ItemsData.find(i => i.id === id);
    
    if (!item) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
    <img
      src={item.imgUrl}
      style={{ width: "125px", height: "75px", objectFit: "cover" }}
    />
    <div className="me-auto">
      <div>
        {item.name}{" "}
        {quantity > 1 && (
          <span className="text-muted" style={{ fontSize: ".65rem" }}>
            x{quantity}
          </span>
        )}
      </div>
      <div className="text-muted" style={{ fontSize: ".75rem" }}>
        {item.price}
      </div>
    </div>
    <div> {item.price * quantity}</div>
    <Button
      variant="outline-danger"
      size="sm"
      onClick={() => removeFromCart(item.id)}
    >
      &times;
    </Button>
  </Stack>
  )
}

export default CartItem