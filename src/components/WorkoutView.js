import React, { useState } from "react";
import { Card, Button, Container, Row, Col, Offcanvas, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faRunning, faHeart, faBicycle, faFlask, faSwimmer, faFistRaised, faArrowsAltH } from "@fortawesome/free-solid-svg-icons";
import { Notyf } from "notyf";
import AddWorkout from "./AddWorkout";

// Helper function to map workout names to icons
const getIconForWorkout = (name) => {
  const workoutName = name.toLowerCase();

  if (workoutName.includes("jogging") || workoutName.includes("running") || workoutName.includes("marathon")) {
    return faRunning;
  } else if (workoutName.includes("body building") || workoutName.includes("strength") || workoutName.includes("powerlifting")) {
    return faDumbbell;
  } else if (workoutName.includes("yoga")) {
    return faHeart;
  } else if (workoutName.includes("cycling") || workoutName.includes("biking")) {
    return faBicycle;
  } else if (workoutName.includes("crossfit") || workoutName.includes("hiit")) {
    return faFlask;
  } else if (workoutName.includes("swimming")) {
    return faSwimmer;
  } else if (workoutName.includes("boxing") || workoutName.includes("kickboxing")) {
    return faFistRaised;
  } else if (workoutName.includes("stretching") || workoutName.includes("mobility")) {
    return faArrowsAltH;
  }
  return faHeart; 
};

export default function WorkoutView({ workoutsData, fetchData }) {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState({ name: "", duration: "" });
  const notyf = new Notyf();
  const handleEditClick = (workout) => {
    console.log(workout); // Log to check if id exists
    setSelectedWorkout(workout);
    setShowOffcanvas(true);
  };

  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  const handleSaveChanges = () => {
    try {
      // Call the API to update the workout

      fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/workouts/updateWorkout/${selectedWorkout._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: selectedWorkout.name,
          duration: selectedWorkout.duration,
        }), // Convert to JSON
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Action Forbidden") {
            notyf.error("Action Forbidden");
          } else {
            notyf.success("Workout Added");
            fetchData()
            setShowOffcanvas(false);
          }
        })
        .catch((error) => {
          notyf.error("Failed to update Workout. Please try again.");
        });
    } catch (error) {
      console.error("Error updating workout", error);
    }
  };

    // Delete function
    const handleDelete = (workoutId) => {
      // Make the DELETE request to the API
      fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_BASE_URL}/workouts/deleteWorkout/${workoutId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Action Forbidden") {
            notyf.error("Action Forbidden");
          } else {
            notyf.success("Workout Deleted");
            fetchData(); // Refresh the workout list after deletion
          }
        })
        .catch((error) => {
          notyf.error("Failed to delete workout. Please try again.");
        });
    };

  return (
    <Container>
      <Row>
        <Col>
          <h3 className="mt-3 text-center">Workouts</h3>
        </Col>
      </Row>

      <Row className="d-flex justify-content-between align-items-center">
        <Col className="text-end">
          <AddWorkout fetchData={fetchData} />
        </Col>
      </Row>

      <Row className="mt-2">
        {workoutsData.length > 0 ? (
          workoutsData.map((workout, index) => (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body className="d-flex">
                  <Col xs={2} className="d-flex justify-content-center align-items-center me-3">
                    <FontAwesomeIcon icon={getIconForWorkout(workout.name)} className="fa-3x" />
                  </Col>
                  <Col xs={7}>
                    <Card.Title className="mb-0">{workout.name}</Card.Title>
                    <Card.Text>
                      <strong>Duration:</strong> {workout.duration}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button variant="primary" size="sm" onClick={() => handleEditClick(workout)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(workout._id)}>
                        Delete
                      </Button>
                    </div>
                  </Col>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No workouts available</p>
        )}
      </Row>

      {/* Offcanvas for editing workout */}
      <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Workout</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group controlId="workoutName">
              <Form.Label>Workout Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedWorkout.name}
                onChange={(e) => setSelectedWorkout({ ...selectedWorkout, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="workoutDuration" className="mt-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                value={selectedWorkout.duration}
                onChange={(e) => setSelectedWorkout({ ...selectedWorkout, duration: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" className="mt-3" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}
