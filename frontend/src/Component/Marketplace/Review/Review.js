import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "../../../Assets/style/Marketplace/Review/Review.css";

const comment_list = [
  { username: "Elmond", time: "5 minutes ago", text: "Good Product" },
  { username: "Elmond", time: "5 minutes ago", text: "Good Product" },
  { username: "Elmond", time: "5 minutes ago", text: "Good Product" },
  { username: "Elmond", time: "5 minutes ago", text: "Good Product" },
];
export default function Review() {
  return (
    <div className="review-component-container">
      <h3 className="mb-4">Comment</h3>
      {/*this is the container where the user can see other people's comments and it uses overflow scroll to make it */}
      {/*allow user to comment just when they already buy products*/}
      <div className=" w-100 d-flex justify-content-end mb-3">
        <form className="input-button-container">
          <label>{/*username */}</label>
          <input
            type="text"
            className="comment-input"
            placeholder="Add a comment..."
          />
          <button className="sent_button">
            <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
          </button>
        </form>
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
