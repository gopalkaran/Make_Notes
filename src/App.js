import "./styles.css";
import logo from "./description.svg";
import { useState, useEffect, useRef } from "react";

export default function App() {
  var [noteList, setNoteList] = useState([]);
  var [editIndex, setEditIndex] = useState(-1);
  var titleRef = useRef();
  var desRef = useRef();

  function clickHandler() {
    var title = titleRef.current.value;
    var des = desRef.current.value;
    if (title === "" || des === "") return;
    var noteList = [];
    if (localStorage.noteEntry) {
      noteList = JSON.parse(localStorage.noteEntry);
    }
    var note = {};
    note.title = title;
    note.des = des;
    if (editIndex >= 0) {
      noteList[editIndex].title = note.title;
      noteList[editIndex].des = note.des;
      setEditIndex(-1);
    } else {
      noteList.unshift(note);
    }
    localStorage.noteEntry = JSON.stringify(noteList);
    setNoteList(noteList);
    titleRef.current.value = "";
    desRef.current.value = "";
  }

  function editNote(index) {
    var noteList = [];
    if (localStorage.noteEntry) {
      noteList = JSON.parse(localStorage.noteEntry);
      titleRef.current.value = noteList[index].title;
      desRef.current.value = noteList[index].des;
    }
    setEditIndex(index);
  }
  function deleteNote(index) {
    var noteList = [];
    if (localStorage.noteEntry) {
      noteList = JSON.parse(localStorage.noteEntry);
      noteList.splice(index, 1);
      localStorage.noteEntry = JSON.stringify(noteList);
      setNoteList(noteList);
    }
    titleRef.current.value = "";
    desRef.current.value = "";
    setEditIndex(-1);
  }
  useEffect(() => {
    var noteList = [];
    if (localStorage.noteEntry) {
      noteList = JSON.parse(localStorage.noteEntry);
    }
    setNoteList(noteList);
  }, []);

  function searchHandler(e) {
    var searchText = e.target.value.toLowerCase();
    var notes = document.getElementsByClassName("row");
    Array.from(notes).forEach((note) => {
      var title = note
        .getElementsByClassName("row-title")[0]
        .innerText.toLowerCase();
      if (title.includes(searchText)) {
        note.classList.remove("hide");
      } else {
        note.classList.add("hide");
      }
    });
  }

  return (
    <div className="App">
      <h1>Make Notes</h1>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="TITLE"
        ref={titleRef}
      />
      <textarea
        id="description"
        placeholder="DESCRIPTION"
        ref={desRef}
      ></textarea>
      <button
        onClick={() => {
          clickHandler();
        }}
      >
        Add Note
      </button>
      <input
        type="search"
        placeholder="Search Notes By Title"
        onChange={searchHandler}
      />
      <h3>Notes List</h3>
      {noteList.map((note, index) => {
        return (
          <div className="row container">
            <img src={logo} alt="icon" />
            <div className="row-des">
              <div className="row-title">{note.title}</div>
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
