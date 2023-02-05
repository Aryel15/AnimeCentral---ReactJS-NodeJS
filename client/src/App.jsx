import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Adicionar from './pages/Adicionar/Adicionar';
import Cadastro from './pages/Cadastro/Cadastro';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import MeusAnimes from './pages/MeusAnimes/MeusAnimes';
import Editar from './pages/Editar/Editar';
import { PrivateRoute } from './Auth/PrivateRoute';
import Animes from './pages/Animes/Animes';
import Users from './pages/Users/Users';


function App() {
  return (
    <div>
      <Router>
        <Routes >
          <Route exact path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/cadastro' element={<Cadastro/>}/>
          <Route path='/adicionar' element={<PrivateRoute><Adicionar/></PrivateRoute>}/>
          <Route path='/editar/:id' element={<PrivateRoute><Editar/></PrivateRoute>}/>
          <Route path='/meusanimes' element={<PrivateRoute><MeusAnimes/></PrivateRoute>}/>
          <Route path='/users/:user' element={<Users/>}/>
          <Route path='/animes/:titulo' element={<Animes/>}/>
        </Routes >
      </Router>
    </div>

  );
}

export default App;
