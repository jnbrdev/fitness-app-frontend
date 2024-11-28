import { useContext } from "react";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Badge, Dropdown, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";
import '../App.css';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  // Fetch cart data on component mount to get the item count
  useEffect(() => {
    if (user.id) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log(data) // Count the number of items (products) in the cart
          }
        })
        .catch((err) => console.error("Error fetching cart:", err));
    }
  }, [user.id]);

  return (
<Navbar bg="dark" expand="lg" className="sticky-top">
  <Container>
    <Navbar.Brand as={Link} to="/" className="text-white brand-font">
      Fitnice
    </Navbar.Brand>
    {user.id !== null ? (
          <>
          <Nav.Link as={Link} to="/workouts" className="text-white">
            Workouts
          </Nav.Link>
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id="profile-dropdown" className="text-white">
              <FontAwesomeIcon icon={faUser} className="text-white" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
        ) : (
          // Other navbar links for logged-out users go here
          <></>
        )}

    {/* Login and Register buttons outside Navbar.Collapse to always show on small screens */}
    {user.id === null && (
      <Nav className="d-flex">
        <Nav.Link as={NavLink} to="/login" exact="true" className="text-white">
          <Button  className="me-2">Login</Button>
        </Nav.Link>
        <Nav.Link as={NavLink} to="/register" exact="true" className="text-white">
          <Button >Register</Button>
        </Nav.Link>
      </Nav>
    )}
  </Container>
</Navbar>

  );
}
