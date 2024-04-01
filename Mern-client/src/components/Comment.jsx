import React, { useState } from 'react';
import {AiOutlineSend} from 'react-icons/ai'
const Comment = ({ onAddNote, clearNotes, downloadNotes }) => {
  const [note, setNote] = useState('');

  const handleNoteChange = (e) => {
     
    setNote(e.target.value);
  };

  const handleAddNote = (e) => {
     e.preventDefault();
    if (note.trim() !== '') {
      onAddNote(note);
      setNote('');
    }
  };

  return (
    <>
   <form className="note-input border-0 border-b-2 border-b-gray-400  mt-4">
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Type a note..."
          className='focus:ring-0 rounded-none border-none h-[40px]'
        />
        <button onClick={handleAddNote} className='bg-main-color text-white' type='submit'><AiOutlineSend/></button>
      </form>
    <div className='flex flex-col md:flex-row justify-start items-baseline gap-4'>

          <button
          onClick={clearNotes}
          className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600 focus:outline-none w-full"
          >
               Clear Notes
          </button>
          <button
               onClick={downloadNotes}
               className="bg-main-color text-white px-4 py-2 rounded-lg mt-2 hover:bg-main-color focus:outline-none w-full"
               >
               Download Notes
          </button>
    </div>
    </>
  );
};

export default Comment;
