import React, { useState, useContext, useEffect  } from "react";
import { db } from "../firebase/firebase.config";
import { serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { AuthContext } from '../contects/AuthProvider';

const CommentForm = ({ parentId, bookId }) => {
  const [text, setText] = useState("");
   
  const { user } = useContext(AuthContext);

  useEffect(() => {
   const commentsRef = collection(db, "books", bookId, "comments");
   onSnapshot(commentsRef , (querySnapshot) => {
       let newComments= [];
         querySnapshot.forEach((doc) => {
             const data = doc.data();
               newComments=[...newComments,
                   {id: data.id, ...data}];
           });
           console.log(newComments);
           setComments(newComments.sort((a, b)=>b.date - a.date));
     })
 },[bookId]);
  const handleSubmit = async (e) => {
   e.preventDefault();
 
   try {
     if (!user) throw new Error("User not signed in");
 
     // Validate text before submitting
     if (!text.trim()) {
       throw new Error("Comment text cannot be empty");
     }
 
     // Add document metadata to Firestore
     await addDoc(collection(db, "books", bookId, "comments"), {
       userId: user.uid,
       userName: user.displayName,
       userImage: user.photoURL,
       parentId: parentId,
       text,
       timestamp: serverTimestamp(),
     });
 
     console.log("review submitted ")
   } catch (error) { 
     console.error('Error adding review to Firebase: ', error);
   } 
   setText("");
 };
 
  return (
    <form onSubmit={handleSubmit}>
      <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
