import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
const GlobalContext = React.createContext();
const BASE_URL = "https://noteekeeper-backend.onrender.com/note-keeper";

export const GlobalProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [note, setNote] = useState([]);
  const [deletedNotes, setdeletedNotes] = useState([]);
  const [viewType, setViewType] = useState("grid");
  const[pinnedNotes,setPinnedNotes] = useState([])
  const { id } = useParams();
  const createNote = async (title, tag, description) => {
    try {
      const response = await axios.post(`${BASE_URL}/create-notes`, {
        title,
        tag,
        description,
      });

      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-notes`);

      if (response && response.data) {
        setNote(response.data.data);
        console.log(response.data.data);
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const toggleViewType = () => {
    setViewType((prevType) => (prevType === "grid" ? "list" : "grid"));
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getdeletedNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/deleted-notes`);

      if (response && response.data) {
        setdeletedNotes(response.data.data)
        console.log(response.data.data);
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


  const searchNotes = async(noteName)=>{
   try {
    const response = await axios.get(`${BASE_URL}/notes-name/${noteName}`)
    if (response && response.data) {
      setNote(response.data.data);
      console.log(response.data.data);
    }
    return response;
   } catch (error) {
    console.log(error)
   }

  }
  const getPinnedNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-notes`); 

      if (response && response.data) {
        const pinnedNotes = response.data.data.filter((note) => note.pinned); 
        setPinnedNotes(pinnedNotes); 
        
      } else {
        console.error("Error fetching notes");
       
      }
    } catch (error) {
      console.error(error);
  
    }
  };

  const contextValue = {
    createNote,
    getAllNotes,
    note,
    viewType,
    toggleViewType,
    deleteNote,
    getdeletedNotes,
    deletedNotes,
    searchNotes,
    getPinnedNotes,
    pinnedNotes
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
