import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import { UserProvider } from './context/UserContext';
import './App.css';

import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Home from './pages/Home';
import Register from './pages/Register';
import Workout from './pages/Workout';
function App() {

  const [user, setUser] = useState({
    id: null
  });
  const unsetUser = () => {

    localStorage.clear();

  };
  useEffect(() => {

    fetch(`https://fitness-app-api-l2sk.onrender.com/users/details`, {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      if (typeof data.user !== "undefined") {

        setUser({
          id: data.user._id,
        });

      } else {

        setUser({
          id: null
        });

      }

    })

    }, []);

    useEffect(() => {
      console.log(user);
      console.log(localStorage);
    }, [user])

    return (
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/workouts" element={<Workout />} />
              <Route path="*" element={<Error />} />
            </Routes>
        </Router>
      </UserProvider>
  );
}

export default App;