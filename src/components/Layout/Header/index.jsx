import { Container, Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>TODO-List</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
