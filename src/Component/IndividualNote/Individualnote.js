import React, { useState } from 'react';
import PushPinIcon from '@mui/icons-material/PushPin';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField } from '@mui/material';
import "./individual.css";
import { ToastContainer, toast } from "react-toastify";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EmojiPicker from 'emoji-picker-react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGlobalContext } from '../Context/context';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useThemeContext } from '../Theme/Theme';


function Individualnote({ title: initialTitle, tag: initialTag, description: initialDescription,id,pinned:initialPinned}) {
const BASE_URL = "https://noteekeeper-backend.onrender.com/note-keeper";

  const navigate = useNavigate()
  const {deleteNote} = useGlobalContext()
  const [popup, setPopup] = useState(false);
  const [emojiPopup, setemojiPopup] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [openDialog, setOpenDialog] =useState(false);
  const [pinned, setPinned] = useState(initialPinned);
  const [pinnedNotes, setPinnedNotes] = useState(initialPinned);
  const {darktheme} = useThemeContext()

  const iconColor = darktheme === 'dark' ? 'white' : '';
  const [inputs, setInputs] = useState({
    title: initialTitle,
    tag: initialTag,
    description: initialDescription,
  });

  const handleFocus = (e) => {
    setFocusedInput(e.target.name);
  };

  const handleOpenDelete = () => {
    setOpenDialog(true)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditPopup = () => {
    setPopup(true);
  };

  const handleEmojiPopup =()=>{
    setemojiPopup(true)
  }
  const handleClose = () => {
    setPopup(false);
    setemojiPopup(false)
    setOpenDialog(false);
  };

  const onEmojiClick = (emojiData) => {
    const { emoji } = emojiData;
    setInputs((prevState) => ({
      ...prevState,
      [focusedInput]: prevState[focusedInput] + emoji,
    }));
    setemojiPopup(false);
  };

const handleDelete =async(id) =>{
try {
  const result = await deleteNote(id)
  toast.success("Note Deleted")
  window.location.reload()
  navigate("/all")

} catch (error) {
  toast.error("Error occured in deleting")
}

}
const handleTogglePin = async () => {
  try {
    const response = await axios.put(`${BASE_URL}/pin/${id}`, { pinned: !pinned }); 

    if (response.status === 200) { 
      setPinned(!pinned); 
      window.location.reload()
    } 
  } catch (error) {
    console.error(error);
   
  }
};

  return (
    <div className='individual'>
      <Box className='note' onClick={handleEditPopup}>
        <Box className='pinbox'>
          <IconButton>
            <PushPinIcon className='pin' onClick={handleTogglePin} style={{ background: iconColor,borderRadius:"10px" }}/>
          </IconButton>
          <Divider />
        </Box>
        <Box>{inputs.title}</Box>
        <Box>{inputs.tag}</Box>
        <Box>{inputs.description}</Box>
      </Box>
      <Dialog open={popup} onClose={handleClose}>
        <DialogContent className="edit-note-popup">
          
          <div className="edit-note">
            <Box className="edit-form">
              <TextField
                type="text"
                label="TITLE"
                variant="standard"
                required
                name="title"
                value={inputs.title}
                onChange={handleChange}
                onFocus={handleFocus}
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
              />
            </Box>
            <Box className="tool-bar">
            <Box>
             
              <IconButton  >
                <InsertEmoticonIcon onClick={handleEmojiPopup}/>
              </IconButton>
            </Box>
            
            <Box>
              <IconButton  >
                <DeleteIcon  onClick={handleOpenDelete}/>
              </IconButton>
            </Box>
          </Box>
        
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={emojiPopup} onClose={handleClose}>
        <DialogContent className="remainder">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </DialogContent>
      </Dialog>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Delete Note</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button  color="error" onClick={()=>{handleDelete(id)}}>
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
     
      <ToastContainer/>
    </div>
  );
}

export default Individualnote;
