import React, { useState, useRef, useEffect, useContext } from "react";
import Action from "../components/Actions";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AuthContext } from '../contects/AuthProvider';

function Comment({ comment,   handleInsertNode, handleEditNode, handleDeleteNode, }) {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [expandReplies, setExpandReplies] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);
  const { user } = useContext(AuthContext);

  console.log(comment)

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
      handleEditNode(comment.id, input);
      setEditMode(false);
    } else {
      handleInsertNode(comment.id, input);
    }
    setInput("");
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };
  return (
    <div className=" p-0 sm:p-6 pl-0 sm:pl-16 bg-[#ffffff] ">
      {
         Array.isArray(comment) && comment.map ((item, index) => (
          <div className="flex space-x-2 mt-3 commentContainer" key={ index}>
            
            <div className="">
              <img src={item.userImage} alt="" className="rounded-full h-7 w-7" />
            </div>
            <div className="sm:w-full w-64 ">
             <div className="flex">
                <h4 className="font-medium text-black dark:text-white">{item.userName}</h4>
                  <p className='text-xs text-gray-500 flex ml-2 mt-1 items-center'>{item.timestamp ? item.timestamp.toLocaleDateString() : ''}</p>
             </div>
              <span
                contentEditable={editMode}
                suppressContentEditableWarning={editMode}
                ref={inputRef}
                style={{ wordWrap: "break-word" }}
                className="w-fit borde focus:outline-none focus:border-0 pr-2 h-[60px]"
              >
                {item.commentText}
              </span>
              {/* <div style={{ display: "flex", marginTop: "5px" }}>
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
              </div> */}
            </div>
          </div>
          ))

                  
      }
    </div>
  )
}

export default Comment