import React, { useState, useRef, useEffect, useContext } from "react";
import Action from "../components/Actions";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AuthContext } from '../contects/AuthProvider';

function CommentForm({ comment,   handleInsertNode, handleEditNode, handleDeleteNode, }) {
  const [input, setInput] = useState("");
  const { user } = useContext(AuthContext);

  const onAddComment = () => {
      handleInsertNode(comment.id, input);
      setInput("");
  };
  return (
    <div className="p-0 sm:p-6 bg-white">
        <div className="flex sm:w-[80%] sm:space-x-5 ">
                  <input
                    type="text"
                    className="inputContainer__inpu first_inpu focus:ring-0 rounded-none border-r-0 border-l-0 border-b mt-3 sm:ml-5 border-t-0 flex-1 h-[40px]"
                    autoFocus
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a comment ...."
                  />
                  <Action
                    className="post comment disabled:cursor-not-allowed disabled:bg-[#e0e0e0] mt-3 disabled:text-white"
                    type="COMMENT"
                    handleClick={onAddComment}
                    disabled={!input}
                  />
                </div>
                <div className="">
            </div>
    </div>
  )
}

export default CommentForm