import { useState, useEffect } from 'react';
import {Event} from "./components/mainpage/event";
import {DefaultContext} from "./Context";
import {Signin} from './components/auth/signin';
import {Profile} from './components/auth/profile';
import {Home} from './components/mainpage/home/index';
import {Fullform} from './components/auth/fullform';
import {Navbar} from './components/mainpage/navbar/index';
import {Footer} from './components/mainpage/footer/index';
import {Registration} from './components/auth/registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Verificator } from './components/verification';
import { profile } from './actions/user';
import { getEvents, getUsers } from './actions/add';
import {Report} from "./components/report/index";
import { Rating } from './components/rating';

// Functions:
//  1)  Sign up                             Done
//  2)  Sign in                             Done
//  3)  Profile                             Done
//  4)  Certification                       Done
//  5)  Event declaration                   Done
//  6)  Registering to events               Done
//  7)  Landing page linking                Done  
//  8)  Reporting system for coordinators   
//  9)  Animations
//  10) Map
//  11) Recycling information
//  12) Donating
//  13) Rating of the volunteers by
//      volunteering hours/recycled trash
//  14) Atteching tasks to coordinators

function App() {

  const [user, setUser] = useState(localStorage.getItem('user'));
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuth, setIsAuth] = useState(token ? true : false);
  const [password, setPassword] = useState('');
  const [events, setEvents] = useState();
  const [current, setCurrent] = useState(0);
  const [users, setUsers] = useState();

  const handleSetIsAuth = () => {
    setIsAuth(!isAuth);
  };
  
  useEffect(() => {
    profile(email, token).then(response => setUser(response));
    getEvents().then(response => setEvents(response));
    getUsers().then(response => setUsers(response));
  }, []);

  return (
    <div className="App">
      <DefaultContext.Provider value={{
        user,
        users,
        email,
        isAuth,
        token,
        password,
        events,
        current, 
        setCurrent,
        setEvents,
        setUser,
        setUsers,
        setEmail,
        setPassword,
        handleSetIsAuth,
        setToken
      }}>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/reg' element={<Registration/>}/>
            <Route path='/fullform' element={<Fullform/>}/>
            <Route path='/verify' element={<Verificator/>}/>
            <Route path='/event' element={<Event/>}/>
            <Route path='/report' element={<Report/>}/>
            <Route path="/rating" element={<Rating/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </DefaultContext.Provider>
    </div>
  );
}

export default App;
