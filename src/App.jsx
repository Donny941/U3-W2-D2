import "./App.css";
import BookList from "./components/BookList";

import Fantasy from "./assets/books/fantasy.json";
import History from "./assets/books/history.json";
import Horror from "./assets/books/horror.json";
import Romance from "./assets/books/romance.json";
import Scifi from "./assets/books/scifi.json";

import MyFooter from "./components/MyFooter";
import NewNav from "./components/NewNav";
import Welcome from "./components/Welcome";
import { useState } from "react";
import { Button, ButtonGroup, Col, Form, Row } from "react-bootstrap";

const bookCategories = {
  Fantasy,
  History,
  Horror,
  Romance,
  Scifi,
};

function App() {
  // state = {
  //   searchValue: "",
  //   categorySelected: "Fantasy",
  // };
  const [searchValue, setsearchValue] = useState("");
  const [categorySelected, setcategorySelected] = useState("Fantasy");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // const { searchValue, categorySelected } = this.state;
  const currentBookArray = bookCategories[categorySelected];
  const filteredBooks = currentBookArray.filter((book) => book.title.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <>
      <NewNav />
      <Welcome />
      <div className="container mt-5">
        <div className="puff-in-center d-flex justify-content-between my-5">
          <Form onSubmit={handleSubmit} className="ms-3">
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Insert Title.."
                  className=" mr-sm-2"
                  value={searchValue}
                  onChange={(e) => setsearchValue(e.target.value)}
                />
              </Col>
              <Col xs="auto">
                <Button type="submit" variant="info">
                  Search Book
                </Button>
              </Col>
            </Row>
          </Form>
          <ButtonGroup aria-label="Category" className="me-5">
            <Button variant="outline-info" onClick={() => setcategorySelected("Fantasy")} active={categorySelected === "Fantasy"}>
              Fantasy
            </Button>
            <Button variant="outline-info" onClick={() => setcategorySelected("History")} active={categorySelected === "History"}>
              History
            </Button>
            <Button variant="outline-info" onClick={() => setcategorySelected("Horror")} active={categorySelected === "Horror"}>
              Horror
            </Button>
            <Button variant="outline-info" onClick={() => setcategorySelected("Romance")} active={categorySelected === "Romance"}>
              Romance
            </Button>
            <Button variant="outline-info" onClick={() => setcategorySelected("Scifi")} active={categorySelected === "Scifi"}>
              Sci-fi
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <BookList books={filteredBooks} />
      <MyFooter />
    </>
  );
}

export default App;
