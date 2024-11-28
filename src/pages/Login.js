
import { useState, useEffect, useContext } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from 'react-router-dom'; 
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function Login() {
  const notyf = new Notyf();
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isActive, setIsActive] = useState(true);

  function authenticate(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access) {
          localStorage.setItem("token", data.access);
          retrieveUserDetails(data.access);
          notyf.success("Login successful");
        } else {
            notyf.error("Login Failed");
        }
      });

    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data.user._id
        });
      });
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <>
<Form onSubmit={(e) => authenticate(e)} className="p-5 rounded shadow-sm bg-white mx-auto my-5" style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="mb-4 text-center">Login</h1>
        
        {/* Email Input */}
        <Form.Group controlId="userEmail" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <InputGroup>
            <Form.Control 
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
        </Form.Group>

        {/* Password Input */}
        <Form.Group controlId="password" className="mb-4">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control 
              type="password" 
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
        </Form.Group>

        {/* Submit Button */}
        <Button 
          variant={isActive ? "primary" : "primary"} 
          type="submit" 
          className="w-100"
          disabled={!isActive}
        >
          {isActive ? "Log In" : "Log In"}
        </Button>

        {/* Optional - Forgot Password Link */}
        <div className="text-center mt-3">
          <div className="text-center mt-3">
            <span>Don't have an account yet? </span>
            <a
              href="/register"
              className="text-primary"
              style={{ textDecoration: "none" }}
            >
              Register
            </a>
          </div>
        </div>
      </Form>
    
    </>
  );
}