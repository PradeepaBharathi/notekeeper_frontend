import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../Context/context";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Individualnote from "../IndividualNote/Individualnote";

import { useThemeContext } from "../Theme/Theme";


function DeletedNotes() {
  const {deletedNotes, getdeletedNotes,viewType } = useGlobalContext();
  const [page, setPage] = useState(1);
  const {darktheme} = useThemeContext()
  const containerBackground = darktheme === "dark" ? "linear-gradient(180deg, #333 70%, #000)" : "linear-gradient(180deg, #FAD0C9FF 70%, rgb(218, 218, 216))";
  const containerStyle = {
    backgroundColor: containerBackground,
  };
  useEffect(() => {
    getdeletedNotes();
  }, []);
  const iconColor = darktheme === 'dark' ? 'white' : 'black';
  const totalPages = Math.ceil(deletedNotes.length / 6);


  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="notesshelf" style={containerStyle}>
      <div className={`notes-keeper ${viewType}`} >
      {deletedNotes &&
        deletedNotes.slice(page * 6 - 6, page * 6).map((notes) => (
          <Individualnote
            key={notes._id}
            id={notes._id}
            title={notes.title}
            tag={notes.tag}
            description={notes.description}
          />
        ))}
     
    </div>
    {deletedNotes.length > 0 && (
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

export default DeletedNotes;
