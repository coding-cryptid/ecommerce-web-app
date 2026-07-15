import { Container, Row, Col, Button, ListGroup, Image } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { removeFromCart } from '../redux/cartSlice';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/80x80?text=No+Image';

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cart.items);

  const dispatch = useAppDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) {
    return (
      <Container className="mt-4 text-center">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty. Go add something nice!</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Shopping Cart</h1>
      <ListGroup>
        {cartItems.map((item) => (
          <ListGroup.Item key={item.id}>
            <Row className="align-items-center">
              <Col xs={2} md={1}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fluid
                  onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                  }}
                />
              </Col>
              <Col xs={10} md={5}>
                {item.title}
              </Col>
              <Col xs={4} md={2}>
                Qty: {item.quantity}
              </Col>
              <Col xs={4} md={2}>
                ${(item.price * item.quantity).toFixed(2)}
              </Col>
              <Col xs={4} md={2} className="text-end">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Cart;