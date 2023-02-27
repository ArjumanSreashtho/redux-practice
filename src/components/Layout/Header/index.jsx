import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routePath from "../../../constants/routePath";
import authService from "../../../services/authService";

export default function Header() {

  const navigator = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <ToastContainer />
      <Container>
        <Navbar.Brand onClick={() => navigator(routePath.HOME)} role="button">TODO-Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="User" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => navigator(routePath.PROFILE)}>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="text-danger" onClick={authService.logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
