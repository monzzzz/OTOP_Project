import { useState } from "react";

export const useComment = () => {
  const [commentList, setCommentList] = useState("");
  const [error, setError] = useState(null);
  const getCommentByUserId = async (userId) => {
    const response = await fetch(`/api/profile/comment/${userId}`);
    const json = await response.json();
    if (response.ok) {
      setCommentList(json);
    }
    if (!response.ok) {
      setError(json.error);
    }
  };
  return { getCommentByUserId, commentList, error };
};
