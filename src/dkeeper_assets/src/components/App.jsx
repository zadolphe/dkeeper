import React, { useInsertionEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper } from "../../../declarations/dkeeper";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dkeeper.createNote(newNote.title, newNote.content)
      return [newNote, ...prevNotes];
    });
  }
  //this code doesnt seem to work for some reason
  // useEffect( () => {
  //   console.log("useffect is triggered");
  //   fetchData();
  // }, [] );

  async function fetchData() {
    //bc async we have to wait on it
    const notesArray = await dkeeper.readNotes();
    setNotes(notesArray);
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
