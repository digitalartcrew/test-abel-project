import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import "./index.css";

function Jumbo() {
  return (
    <div>
      <Jumbotron fluid className="display">
        <Container className="jumbo mx-0">hello</Container>
      </Jumbotron>
    </div>
  );
}

export default Jumbo;
