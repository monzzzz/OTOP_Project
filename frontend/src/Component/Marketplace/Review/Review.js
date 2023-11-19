import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "../../../Assets/style/Marketplace/Review/Review.css";
export default function Review() {
  return (
    <div className="review-component-container">
      <h3>Comment</h3>
      <div></div>{" "}
      {/*this is the container where the user can see other people's comments and it uses overflow scroll to make it */}
      {/*allow user to comment just when they already buy products*/}
      <div className=" w-100 d-flex justify-content-end">
        <form className="input-button-container">
          <label>{/*username */}</label>
          <input type="text" className="comment-input" />
          <button className="sent_button">
            <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
          </button>
        </form>
      </div>
    </div>
  );
}
