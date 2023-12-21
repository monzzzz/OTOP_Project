import { useEffect } from "react";
import { useComment } from "../../../../Hook/Profile/useComment";
import { useAuthContext } from "../../../../Hook/Authentication/useAuthContext";
import ContentLoader from "react-content-loader";
import "../../../../Assets/style/Profile/Context/Comment.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Comment() {
  const { getCommentByUserId, deleteComment, commentList, error } =
    useComment();
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      getCommentByUserId(user.id);
    }
  }, []);
  const handleDeleteComment = async (e, commentId) => {
    e.preventDefault();
    deleteComment(user.id, commentId);
  };
  return (
    <div className="profile-comment-container">
      <h3 className="mb-4">Your Comment</h3>
      <div>
        {commentList ? (
          commentList.map((comment, index) => (
            <div className="profile-each-comment" key={index}>
              <div>
                <div className="profile-comment-moment">
                  {moment(comment.createdAt).fromNow()}
                </div>
                <div>{comment.text}</div>
              </div>
              <div className="d-flex align-items-center profile-comment-trash">
                <FontAwesomeIcon
                  onClick={(e) => handleDeleteComment(e, comment._id)}
                  icon={faTrash}
                ></FontAwesomeIcon>
              </div>
            </div>
          ))
        ) : (
          <ContentLoader viewBox="0 0 400 300">
            <rect x="0" y="10" rx="4" ry="4" width="400" height="30" />
            <rect x="0" y="50" rx="4" ry="4" width="400" height="30" />
            <rect x="0" y="90" rx="4" ry="4" width="400" height="30" />
            <rect x="0" y="130" rx="4" ry="4" width="400" height="30" />
            <rect x="0" y="170" rx="4" ry="4" width="400" height="30" />
            <rect x="0" y="210" rx="4" ry="4" width="400" height="30" />
            <rect x="0" y="250" rx="4" ry="4" width="400" height="30" />
          </ContentLoader>
        )}
      </div>
    </div>
  );
}
