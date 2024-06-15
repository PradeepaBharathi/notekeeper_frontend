import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Nav from './Component/Navbar/Nav';
import Home from './Component/Home/Home';
import {  useThemeContext } from './Component/Theme/Theme';
import Createnote from './Component/CreateNote/Createnote';
import AllNotes from './Component/AllNote/Allnotes';
import Deletednotes from './Component/DeletedNotes/Deletednotes';




function App() {
  const { darktheme } = useThemeContext();
  return (
    <div className={`App ${darktheme}`}>
     <BrowserRouter>
    
    <Nav/>
     <Routes>
      
      <Route path='/' element={<AllNotes/>}/>
      <Route path='/create' element={<Createnote/>}/>
      <Route path='/all' element={<AllNotes/>}/>
      <Route path='/deletednotes' element={<Deletednotes/>}/>
     </Routes>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
