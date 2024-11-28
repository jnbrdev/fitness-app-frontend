import { Container } from "react-bootstrap";
import "../App.css";  // Ensure the stylesheet is being imported if needed.
import backgroundImage from '../assets/hero.jpg';

export default function Home() {
  return (
    <>
      {/* Section with background image and welcome message */}
      <Container
        className="welcome-section"
        fluid
        style={{
          backgroundImage: `url(${backgroundImage})`, // Path to your image in the public/assets folder
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',  // Ensure it covers the full viewport height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',  // Text color for visibility
          textAlign: 'center',
        }}
      >
        <h1>Welcome to Fitnice</h1>
      </Container>

      {/* Other sections if needed */}
      <Container className="p-0">
        {/* Your other content goes here */}
      </Container>
    </>
  );
}
