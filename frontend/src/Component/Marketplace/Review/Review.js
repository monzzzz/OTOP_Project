import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "../../../Assets/style/Marketplace/Review/Review.css";
import { useAuthContext } from "../../../Hook/Authentication/useAuthContext";
const comment_list = [
  { username: "Elmond", time: "5 minutes ago", text: "Good Product" },
  { username: "Elmond", time: "5 minutes ago", text: "Good Product" },
  { username: "Elmond", time: "5 minutes ago", text: "Good Product" },
  { username: "Elmond", time: "5 minutes ago", text: "Good Product" },
];
export default function Review({ productId }) {
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState("");
  const postComment = async (e) => {
    e.preventDefault();
    console.log(commentText);
    if (!commentText) {
      console.log("text must be filled");
    }
    const userId = user.id;
    const response = await fetch("/api/comment/products", {
      method: "POST",
      body: JSON.stringify({
        text: commentText,
        userId: userId,
        productId: productId,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
  };
  useEffect(() => {
    const fetchComment = async () => {
      const response = await fetch(`/api/comment/products/${productId}`);
      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setCommentList(json.comment);
        console.log(json.comment);
      }
    };
    if (productId) {
      fetchComment();
    }
  }, [productId]);
  return (
    <div className="review-component-container">
      <h3 className="mb-4">Comment</h3>
      {/*this is the container where the user can see other people's comments and it uses overflow scroll to make it */}
      {/*allow user to comment just when they already buy products*/}
      <div className=" w-100 d-flex justify-content-end mb-4">
        {user && (
          <form
            className="input-button-container"
            onSubmit={(e) => {
              postComment(e);
            }}
          >
            <label>{/*username */}</label>
            <input
              type="text"
              className="comment-input"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="sent_button">
              <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
            </button>
          </form>
        )}
      </div>
      <div className="inside-comment-container w-100">
        {comment_list.map((comment, index) => (
          <div className="each-comment-container mb-3" key={index}>
            <div className="top-comment-box">
              <span className="product-comment-username">
                {comment.username}
              </span>
              <span className="m-2 product-comment-time">{comment.time}</span>
            </div>
            <div>{comment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
