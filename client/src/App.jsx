import Navbar from './components/navbar/index';
import Home from './components/home/index';
import Footer from './components/footer/index';
import Registration from './components/registration';
import FullForm from './components/fullform';
import SignIn from './components/signin';
import Profile from './components/profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import {DefaultContext} from "./Context";

// Functions:
//  1) Sign up                            Done
//  2) Sign in                            Done
//  3) Profile                            Done
//  4) Certification                      Done
//  5) Event declaration                  
//  6) Registering to events
//  7) Reporting system for coordinators
//  8) 

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSetIsAuth = () => {
    setIsAuth(!isAuth);
  };

  return (
    <div className="App">
      <DefaultContext.Provider value={{user, email, password, isAuth, setEmail, setPassword, setUser, handleSetIsAuth}}>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/reg' element={<Registration/>}/>
            <Route path='/fullform' index element={<FullForm/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </DefaultContext.Provider>
      
    </div>
  );
}

export default App;
