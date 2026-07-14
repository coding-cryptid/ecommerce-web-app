import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          FakeStore
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Shop
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            Cart
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;