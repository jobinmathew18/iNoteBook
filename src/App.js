//to run the app: npm run both

import './App.css';

//npm react-router-dom
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import Navbar from './Component/Navbar';
import Home from './Component/Home';
import About from './Component/About';
import NoteState from './Context/notes/NoteState';
import Alert from './Component/Alert';
import Login from './Component/Login';
import Signup from './Component/Signup';
import { useState } from 'react';

function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <div>
      <NoteState>
        <Router>  

          <Navbar/>  
          <Alert alert={alert}/>

          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert}/>}></Route>
              <Route exact path='/about' element={<About/>}></Route>
              <Route exact path='/login' element={<Login showAlert={showAlert}/>}></Route>
              <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}></Route>
            </Routes>
          </div>
          
        </Router>   
      </NoteState> 
    </div>
  );
}

export default App;
 