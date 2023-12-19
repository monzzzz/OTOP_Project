import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "../../../Assets/style/Marketplace/Review/Review.css";
import { useAuthContext } from "../../../Hook/Authentication/useAuthContext";
import moment from "moment";
import ContentLoader from "react-content-loader";

export default function Review({ productId }) {
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const [commentText, setCommentText] = useState("");
  const [isCommentLoading, setCommentIsLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const fetchComment = async () => {
    setCommentIsLoading(true);
    const response = await fetch(`/api/comment/products/${productId}`);
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setCommentList(json.comment);
      console.log(json.comment);
    }
    setCommentIsLoading(false);
  };
  const postComment = async (e) => {
    e.preventDefault();
    console.log(commentText);
    if (!commentText) {
      console.log("text must be filled");
    }
    const userId = user.id;
    const username = user.username;
    const response = await fetch("/api/comment/products", {
      method: "POST",
      body: JSON.stringify({
        text: commentText,
        userId: userId,
        username: username,
        productId: productId,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    fetchComment();
  };
  useEffect(() => {
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
        {commentList &&
          (isCommentLoading ? (
            <div>
              <ContentLoader viewBox="0 0 380 200">
                <rect x="0" y="0" rx="3" ry="3" width="400" height="25" />
                <rect x="0" y="30" rx="3" ry="3" width="400" height="25" />
                <rect x="0" y="60" rx="3" ry="3" width="400" height="25" />
              </ContentLoader>
            </div>
          ) : (
            commentList.map((comment, index) => (
              <div className="each-comment-container mb-3" key={index}>
                <div className="top-comment-box">
                  <span className="product-comment-username">
                    {comment.username}
                  </span>
                  <span className="m-2 product-comment-time">
                    {moment(comment.createdAt).fromNow()}
                  </span>
                </div>
                <div>{comment.text}</div>
              </div>
            ))
          ))}
      </div>
    </div>
  );
}
