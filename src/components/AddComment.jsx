import { Component, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";

function AddComment({ id, commentRefresh }) {
  // state = {
  //   comment: "",
  //   rate: "1",
  //   elementId: "",
  // };
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState("1");

  const postComment = async () => {
    try {
      const newComment = {
        comment: comment,
        rate: rate,
        elementId: id,
      };
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/`,

        {
          method: "POST",
          body: JSON.stringify(newComment),
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNkMDUxYzZmMzAyMjAwMTUxMDgwYjgiLCJpYXQiOjE3NTk4NDA4MDUsImV4cCI6MTc2MTA1MDQwNX0.DuFulFdc1w-VVaa3XWOeQRHLhJN2Yj1Unl_hDynp50g",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // this.setState({ comment: "", rate: "" });
        setComment("");
        setRate("1");
        commentRefresh();
        // console.log(data);
        return data;
      } else {
        console.log("error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment();
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Row>
        <div className="border border-info p-2 rounded">
          <h4>Add Comment:</h4>
          <Col xs="auto" className="d-flex flex-column gap-2 mt-2">
            <Form.Control type="text" placeholder="Your Comment.." className=" mr-sm-2" value={comment} onChange={(e) => setComment(e.target.value)} required />
            <Form.Select size="sm" value={rate} onChange={(e) => setRate(e.target.value)}>
              <option>Stars</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Button className="mt-2 " type="submit" variant="info">
              Post
            </Button>
          </Col>
        </div>
      </Row>
    </Form>
  );
}

export default AddComment;
