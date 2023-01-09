import { Container, Navbar } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <ToastContainer />
      <Container>
        <Navbar.Brand>TODO-App</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
