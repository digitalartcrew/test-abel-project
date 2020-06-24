import React, { useState } from "react";
import { useEffect } from "react";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";
import API from "../utils/API.js";
import Input from "../components/Input";
import Button from "../components/Button";
import BrowseBeerCard from "../components/BrowseBeerCard";
import { NavigationBar } from "../components/NavigationBar";

import "./BrowseBeers.css";

function BrowseBeers() {
  // For API -> Card Usage:
  const [beers, setBeers] = useState({ data: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // For API -> Card Usage:
  useEffect(() => {
    API.getBeers().then((res) => {
      setBeers(res.data);
    });
    console.log("useEffect has been called");
  }, []);

  useEffect(() => {
    const results = beers.data
      .slice(0, 6)
      .filter((beer) => beer.name.toLowerCase().includes(searchTerm));
    setSearchResults(results);
  }, [searchTerm]);

  // Destructure the name and value properties off of event.target
  // Update the appropriate state
  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  // When the form is submitted, prevent its default behavior
  //  Get BeersLocal update the BeersLocal state
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(searchTerm);

    API.getBeersLocal(searchTerm)
      .then((res) => setSearchResults(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <NavigationBar />
      <Jumbotron fluid className="jumboBrowsePage mb-1">
        <Container className="banner mx-0 px-0">
          <Row>
            <Col className="jumboTitle">Browse Beers</Col>
          </Row>
        </Container>
      </Jumbotron>

      <Container className=" py-0">
        <Row>
          <Col>
            <form>
              <Row>
                <Col xs={12} sm={12} md={10} lg={10} xl={10}>
                  <Input
                    name="SearchTerm"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search For a Beer"
                  />
                </Col>
                <Col xs={12} sm={12} md={2} lg={2} xl={2}>
                  <Button
                    type="success"
                    onClick={handleFormSubmit}
                    className="searchWidth my-auto"
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
        {searchResults.length ? (
          <Row>
            {searchResults.map((beer, index) => {
              return BrowseBeerCard(beer);
            })}
          </Row>
        ) : (
          <Row>
            {beers.data.slice(0, 6).map((beer, index) => {
              return BrowseBeerCard(beer);
            })}
          </Row>
        )}
      </Container>
    </div>
  );
}
export default BrowseBeers;

// document.getElementById("addBeer").onclick = function(){console.log('Beer Added')}
