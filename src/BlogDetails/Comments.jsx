import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Comments = () => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/comments").then((res) => {
      console.log(res.data);
      setComments(res.data[0]);
    });
  }, []);
  console.log(comments);
  return <div> comments: {comments.userName}</div>;
};

export default Comments;
