import React, { useState, useRef, useEffect, useContext } from "react";
import Action from "../components/Actions";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AuthContext } from '../contects/AuthProvider';


const Comment = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [expandReplies, setExpandReplies] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleExpand = () => {
    if (comment.items && comment.items.length > 0) {
      setExpandReplies(!expandReplies);
    }
  }

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      setExpandReplies(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  return (
    <div className="borde p-0 sm:p-6 bg-[#ffffff]">
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        {comment.id === 1 ? (
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
        ) : (
          <div className="flex space-x-2">
            <div className="">
              <img src={user.photoURL} alt="" className="rounded-full h-7 w-7" />
            </div>
            <div className="sm:w-full w-64 ">
              <h4 className="font-medium text-black dark:text-white">{user.displayName}</h4>
              <span
                contentEditable={editMode}
                suppressContentEditableWarning={editMode}
                ref={inputRef}
                style={{ wordWrap: "break-word" }}
                className="w-fit borde focus:outline-none focus:border-0 pr-2 h-[60px]"
              >
                {comment.name}
              </span>
              <div style={{ display: "flex", marginTop: "5px" }}>
                {editMode ? (
                  <div className="space-x-2">
                    <Action
                      className="reply comment disabled:cursor-not-allowed disabled:bg-[#e0e0e0] disabled:text-white"
                      type="Save"
                      handleClick={onAddComment}
                      disabled={!editMode}
                    />
                    <Action
                      className="reply comment"
                      type="Cancel"
                      handleClick={() => {
                        if (inputRef.current)
                          inputRef.current.innerText = comment.name;
                        setEditMode(false);
                      }}
                    />
                  </div>
                ) : (
                  <div className="space-x-2">
                    <Action
                      className="reply comment "
                      type={
                        <div className="font-semibol flex text-center items-center justify-center space-x-1">
                          <span>Reply</span>
                        </div>
                      }
                      handleClick={handleNewComment}
                    />
                    {comment.items && comment.items.length > 0 && (
                      <Action
                        className="reply comment font-semibol disabled:cursor-not-allowed disabled:bg-[#e0e0e0] disabled:text-white"
                        type={
                          <div>
                            {expandReplies ? (
                              <div className="flex text-center items-center justify-center space-x-1">
                                <IoIosArrowUp width="10px" height="10px" className="" />
                                <span>Hide replies</span>
                              </div>
                            ) : (
                              <div className="flex text-center items-center justify-center space-x-1">
                                <IoIosArrowDown width="10px" height="10px" />
                                <span>View replies</span>
                              </div>
                            )}
                          </div>
                        }
                        handleClick={handleExpand}
                      />
                    )}
                    {user ? (
                      <>
                      <Action
                      className="reply comment disabled:cursor-not-allowed disabled:bg-[#e0e0e0] disabled:text-white"
                      type="Edit"
                      handleClick={() => {
                        setEditMode(true);
                      }}
                      disabled={!inputRef}
                    />
                    <Action
                      className="reply  text-center comment"
                      type="Delete"
                      handleClick={handleDelete}
                    />
                      </>
                    ): (
                      <></>
                    )
                      
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ paddingLeft: 6 }}>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 12 }}>
          {showInput && (
            <div className="inputContainer mt-3">
              <input
                type="text"
                className="focus:ring-0 rounded-none border-r-0 border-l-0 border-b border-t-0 flex-1 h-[40px] inputContainer__inpu"
                autoFocus
                onChange={(e) => setInput(e.target.value)}
                placeholder="Reply comment"
              />
              <div className="flex space-x-2">
                <Action
                  className="reply comment disabled:cursor-not-allowed disabled:bg- disabled:text-[#b39f9f]"
                  type="Post"
                  handleClick={onAddComment}
                  disabled={!input}
                />
                <Action
                  className="reply comment"
                  type="Cancel"
                  handleClick={() => {
                    setShowInput(false);
                    if (!comment?.items?.length) setExpand(false);
                  }}
                />
              </div>
            </div>
          )}
        </div>
        {expandReplies && comment.items && comment?.items?.map((cmnt) => {
          console.log(cmnt);
          return (
            <Comment
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
