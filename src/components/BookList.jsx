import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";

function BookList({ books }) {
  // state = {
  //   bookAsin: null,
  // };
  const [bookAsin, setbookAsin] = useState(null);

  const handleSelected = (actualAsin) => {
    setbookAsin(bookAsin === actualAsin ? null : actualAsin);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex">
        <Row>
          <Col md={8}>
            <Row xs={1} md={3} lg={3} className="gap-5">
              {books.map((book) => (
                <SingleBook key={book.asin} book={book} handleSelect={handleSelected} selected={bookAsin === book.asin} />
              ))}
            </Row>
          </Col>
          <Col md={4}>
            <CommentArea id={bookAsin} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BookList;
