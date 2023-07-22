import { useContext } from 'react';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthContext from './Context/AuthContext';

function App() {
  const { user } = useContext(AuthContext)

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={user ? <Home /> : <Login />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;