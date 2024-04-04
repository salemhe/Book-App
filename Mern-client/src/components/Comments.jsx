import React, { useState } from "react";
import CommentForm from "./CommentForm";

const Comments = ({ comment, bookId }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  return (
    <div className="comment">
      <p>{comment.text}</p>
      <button onClick={toggleReplyForm}>Reply</button>
      {showReplyForm && <CommentForm parentId={comment.id} bookId={bookId} />} {/* Pass parentId prop */}
      {comment.replies && comment.replies.map(reply => (
        <Comments key={reply.id} comment={reply} bookId={bookId} /> // Recursively pass parentId prop
          
      ))}
    </div>
  );
};

export default Comments;
