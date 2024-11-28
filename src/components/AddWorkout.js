import React, { useState, useEffect, useContext } from "react";
import { Button, Offcanvas, Form } from "react-bootstrap";
import { Notyf } from "notyf";
import UserContext from "../context/UserContext";
export default function AddWorkout({ fetchData }) {
    const notyf = new Notyf();
    const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [isActive, setIsActive] = useState(false);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    setIsActive(name !== "" && duration);
  }, [name, duration]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/workouts/addWorkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, duration }), // Convert to JSON
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Action Forbidden") {
          notyf.error("Action Forbidden");
        } else {
          notyf.success("Workout Added");
          fetchData()
          handleClose();
        }
      })
      .catch((error) => {
        notyf.error("Failed to add Workout. Please try again.");
      });
};



  return (
    <>
      <Button className="mt-2" variant="primary" onClick={handleShow}>
        + Add Workout
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add New Workout</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formWorkoutName">
              <Form.Label>Workout Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter workout name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDuration">
              <Form.Label>Duration (mins)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Workout
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
