import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AddIcon from "@mui/icons-material/Add";
import React, {  useState } from "react";
import { useGlobalContext } from "../Context/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmojiPicker from "emoji-picker-react";

import "./createnote.css";

import { useThemeContext } from "../Theme/Theme";
import { useNavigate } from "react-router-dom";

function Createnote() {
  const navigate = useNavigate()
  const { createNote } = useGlobalContext();
  const {darktheme} = useThemeContext()
  const [message, setMessage] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [popup, setPopup] = useState(false);
  const [reminderPopup, setReminderPopup] = useState(false);
const[rPopup,setRpopup] = useState(false)

  const [inputs, setInputs] = useState({
    title: "",
    tag: "",
    description: "",
  });

  const iconColor = darktheme === 'dark' ? 'white' : 'black';

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFocus = (e) => {
    setFocusedInput(e.target.name);
  };

  const createNotes = async (e) => {
    e.preventDefault();
    try {
      const response = await createNote(
        inputs.title,
        inputs.tag,
        inputs.description
      );
      console.log(response.data.data);
      toast.success("Note created");
      setMessage("Note created");
      setTimeout(() => {
        navigate("/all");
      }, 2000);
    } catch (error) {
      console.log(error.response);
      if (error.response.data.message === "Please fill all fields") {
        toast.error("Please fill all fields.");
        setMessage("Please fill all fields.");
      } else {
        toast.error("Note not created, try again.");
        setMessage("Note not created, try again.");
      }
    }
  };

  const handleEmoji = () => {
    setPopup(true);
  };

  const handleClose = () => {
    setPopup(false);
    setRpopup(false)
  };

  const onEmojiClick = (emojiData) => {
    const { emoji } = emojiData;
    setInputs((prevState) => ({
      ...prevState,
      [focusedInput]: prevState[focusedInput] + emoji,
    }));
    setPopup(false);
  };

  



  return (
    <div className="create">
      <ToastContainer />

      <h3>ADD NOTE</h3>
      <div className="create-note">
        <Box className="create-form">
          <TextField
            type="text"
            label="TITLE"
            variant="standard"
            required
            name="title"
            value={inputs.title}
            onChange={handleChange}
            onFocus={handleFocus}
            InputLabelProps={{
              style: { color: iconColor },
            }}
          />
          <TextField
            type="text"
            label="TAG"
            variant="standard"
            required
            name="tag"
            value={inputs.tag}
            onChange={handleChange}
            onFocus={handleFocus}
            InputLabelProps={{
              style: { color: iconColor },
            }}
          />
          <TextField
            type="text"
            label="ENTER DESCRIPTION"
            variant="standard"
            required
            name="description"
            value={inputs.description}
            onChange={handleChange}
            onFocus={handleFocus}
            InputLabelProps={{
              style: { color: iconColor },
            }}
          />
          <Box className="tool-bar">
            <Box>
             
              <IconButton onClick={handleEmoji} style={{ color: iconColor }} >
                <InsertEmoticonIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton onClick={createNotes} style={{ color: iconColor }} >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </div>
      <Dialog open={popup} onClose={handleClose}>
        <DialogContent className="remainder">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </DialogContent>
      </Dialog>
     
    </div>
  );
}

export default Createnote;
