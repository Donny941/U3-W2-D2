import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import { Alert } from "react-bootstrap";

function CommentArea({ id }) {
  // state = {
  //   comments: [],
  // };
  const [comments, setComment] = useState([]);

  const commentLoad = async () => {
    if (!id) {
      setComment([]);
      return;
    }
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGNkMDUxYzZmMzAyMjAwMTUxMDgwYjgiLCJpYXQiOjE3NTk4NDA4MDUsImV4cCI6MTc2MTA1MDQwNX0.DuFulFdc1w-VVaa3XWOeQRHLhJN2Yj1Unl_hDynp50g",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setComment(data);
        return data;
      } else {
        console.log("error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // console.log(` ${this.props.id}`);
    commentLoad();
  }, [id]);

  // componentDidMount = () => {
  //   this.commentLoad();
  // };
  const hideComment = () => {
    return (
      <Alert variant="info">
        <p>Click one book to load comments!</p>
      </Alert>
    );
  };

  if (!id) return hideComment();
  return (
    <div className="nav-bg p-4 rounded border border-info border-3 me-5">
      {id && <CommentList comments={comments} />}
      {/* {!this.props.id && (
          <Alert variant="info">
            <p>Click one book to load comments!</p>
          </Alert>
        )} */}
      {id && <AddComment id={id} commentRefresh={commentLoad} />}
    </div>
  );
}

export default CommentArea;
