import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Context/context";
import { Divider, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Individualnote from "../IndividualNote/Individualnote";
import "./allnote.css";
import { useThemeContext } from "../Theme/Theme";
import Pinnednotes from "../PinnedNotes/Pinnednotes";

function Allnotes() {
  const { getAllNotes, note, viewType } = useGlobalContext();
  const [page, setPage] = useState(1);

  const { darktheme } = useThemeContext();
  const containerBackground =
    darktheme === "dark"
      ? "linear-gradient(180deg, #333 70%, #000)"
      : "linear-gradient(180deg, #FAD0C9FF 70%, rgb(218, 218, 216))";
  const containerStyle = {
    backgroundColor: containerBackground,
  };
  useEffect(() => {
    getAllNotes();
  }, []);

  const iconColor = darktheme === "dark" ? "white" : "black";
  const totalPages = Math.ceil(note.length / 6);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="notesshelf" style={containerStyle}>
      <div className={`notes ${viewType} `}>
        <Pinnednotes />

        <div className={`notes-keeper ${viewType}`}>
          {note &&
            note
              .slice(page * 6 - 6, page * 6)
              .map((notes) => (
                <Individualnote
                  key={notes._id}
                  id={notes._id}
                  title={notes.title}
                  tag={notes.tag}
                  description={notes.description}
                  pinned={false}
                />
              ))}
        </div>
      </div>
      {note.length > 0 && (
        <div className="pagination">
          {page > 1 && (
            <span onClick={() => handlePageClick(page - 1)}>⬅️</span>
          )}
          {[...Array(totalPages)].map((_, index) => {
            return (
              <span key={index} onClick={() => handlePageClick(index + 1)}>
                {index + 1}
              </span>
            );
          })}
          {page < totalPages && (
            <span onClick={() => handlePageClick(page + 1)}>➡️</span>
          )}
        </div>
      )}
    </div>
  );
}

export default Allnotes;
