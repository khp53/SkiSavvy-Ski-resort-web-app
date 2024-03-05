import React from 'react';
import { Navbar, Nav, Container, Image, Button } from 'react-bootstrap';

const BasicPage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">SkiSavvy - Group 11</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Display Piste Map</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Body */}
      <Container>
        <Image src="/assets/map.png" fluid />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button variant="primary" style={{ marginRight: '10px' }}>Find Best Path</Button>
          <Button variant="primary" style={{ marginRight: '10px' }}>Find Amenities</Button>
          <Button variant="primary">Display Lift Path</Button>
        </div>
      </Container>
    </div>
  );
};

export default BasicPage;
