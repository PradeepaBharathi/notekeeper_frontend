import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu';
import  {InputAdornment,TextField} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import note from '../Assests/note.png'
import './nav.css'
import { useThemeContext } from '../Theme/Theme';
import { useNavigate } from 'react-router-dom';
import Allnotes from '../AllNote/Allnotes';
import { useGlobalContext } from '../Context/context';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#FAD0C9FF',

});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: 'transparent',

  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
 
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: 'transparent',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function Nav() {
  const theme = useTheme();
  const navigate = useNavigate()
  const {darktheme,toggleTheme,} = useThemeContext()
  const{toggleViewType,searchNotes} = useGlobalContext()
  const [open, setOpen] = useState(false);
  const [menu,setMenu]  = useState(false)
const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const iconColor = darktheme === 'dark' ? 'white' : 'black';
 
  const handleRefresh =() =>{
    window.location.reload()
  }

  const handleSearch = (event) => {
    const query = event.target.value;
    if (query) {
      searchNotes(query);
    }
    if(query==''){
      window.location.reload()
    }
  };
  return (
    <Box sx={{ display: 'flex' }} className='nav'>
      <CssBaseline />
      <AppBar position="sticky" open={open} >
        <Toolbar className='navbar'>
          <Box className='nav-left'>
          <IconButton
            
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              
              ...(open && { display: 'none' }),
            }}
           
          >
            <MenuIcon  fontSize='large' style={{ color: iconColor }}  />
          </IconButton>
           <img src={note} alt='note-logo' className='note-logo'/>
          <Typography className='heading' style={{ color: iconColor }} >
           Notes
          </Typography>
          
          </Box>
          <TextField
          
            className='search-bar'
            variant="standard"
            placeholder="Search..."
            onKeyUp={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: iconColor }} />
                </InputAdornment>
              ),
            }}
        
          />
          <Box className='nav-right' >
            <IconButton style={{ color: iconColor }} onClick={handleRefresh}>
              <RefreshIcon fontSize="large"  />
            </IconButton>
            <IconButton style={{ color: iconColor }} onClick={toggleViewType }>
              <FormatListBulletedIcon fontSize='large' />
            </IconButton>
            <IconButton  onClick={toggleTheme} style={{ color: iconColor }}>
              <LightbulbIcon fontSize="large"/>
            </IconButton>
          
            
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{
              
              ...(!open && { display: 'none' }),
            }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['AllNotes', 'CreateNote', 'Trash'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 
                  {text == 'AllNotes'
                   ?<IconButton onClick={()=>{navigate("/all")}}><TextSnippetIcon style={{ color: iconColor }} /></IconButton>
                    : text=='CreateNote' ? <IconButton onClick={()=>{navigate("/create")}} 
                    style={{ color: iconColor }}><EditIcon  /></IconButton>  
                    : <DeleteIcon onClick={()=> navigate("/deletednotes")}style={{ color: iconColor }} />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Drawer>
      
    </Box>
  );
}
