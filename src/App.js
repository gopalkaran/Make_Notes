import "./styles.css";
import logo from "./description.svg";
import { useState, useEffect } from "react";

export default function App() {
  var [title, setTitle] = useState("");
  var [des, setDes] = useState("");
  var [noteList, setNoteList] = useState([]);
  function takeTitle(e) {
    setTitle(e.target.value);
  }
  function takeDes(e) {
    setDes(e.target.value);
  }
  function clickHandler() {
    var noteList = [];
    if (localStorage.noteEntry) {
      noteList = JSON.parse(localStorage.noteEntry);
    }
    var note = {};
    note.title = title;
    note.des = des;
    console.log(note);
    noteList.unshift(note);
    console.log(noteList);
    localStorage.noteEntry = JSON.stringify(noteList);
    setNoteList(noteList);
  }
  function editNote(index) {
    var noteList = [];
    if (localStorage.noteEntry) {
      noteList = JSON.parse(localStorage.noteEntry);
      console.log(noteList[index]);
    }
  }
  function deleteNote(index) {
    var noteList = [];
    if (localStorage.noteEntry) {
      noteList = JSON.parse(localStorage.noteEntry);
      noteList.splice(index, 1);
      localStorage.noteEntry = JSON.stringify(noteList);
      setNoteList(noteList);
    }
  }
  useEffect(() => {
    var noteList = [];
    if (localStorage.noteEntry) {
      noteList = JSON.parse(localStorage.noteEntry);
    }
    setNoteList(noteList);
  }, []);
  return (
    <div className="App">
      <h1>Make Notes</h1>
      <input
        type="text"
        name="title"
        placeholder="TITLE"
        onChange={takeTitle}
      />
      <textarea
        id="description"
        placeholder="DESCRIPTION"
        onChange={takeDes}
      ></textarea>
      <button
        onClick={() => {
          clickHandler();
        }}
      >
        Add Note
      </button>
      <input type="search" placeholder="Search Notes" />
      {noteList.map((note, index) => {
        return (
          <div className="row container">
            <img src={logo} alt="icon" />
            <div className="row-des">
              <span>{note.title}</span>
              <small>{note.des}</small>
              <div className="row-control">
                <button
                  onClick={() => {
                    editNote(index);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteNote(index);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
