import './animes.css';
import '../../components/Menu/menu.css';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ToggleTheme } from '../../Themes/ToggleTheme'
import Axios from 'axios';

export default function Animes() {
  const {titulo} = useParams();
  const [menuAberto, setMenu] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
      Axios.get(`https://animecentral-reactjs-nodejs.onrender.com/anime/titulo/${titulo}`)
      .then((response) => {
        setData(response.data)
      });

  },[titulo])

  return (
    <>
        <nav>
            <a className='logo' href="/"><img src="../imgs/logo-n.png" alt="logo Anime Central nas cores branco e cinza" /></a>
            <input type="checkbox" name="" id="input-checkbox" className="input-checkbox"/>
            <label htmlFor="input-checkbox" className="nav-button" onClick={() => setMenu(!menuAberto)}>
                <span></span>
            </label>
            { 
            localStorage.getItem("user") ? 
            <ul className={ menuAberto ? 'menu-mobile' : 'menu'}>
                <li><a href="/">Home</a></li>
                <li><a href="/adicionar">Adicionar Anime</a></li>
                <li><a href="/meusanimes">Meus animes</a></li>
                <ToggleTheme/>
            </ul>
            : ""
            }
            { 
            localStorage.getItem("user") === null ? 
            <ul className={ menuAberto ? 'menu-mobile' : 'menu'}>
                <li><a href="/login">Login</a></li>
                <li><a href="/cadastro">Cadastre-se</a></li>
                <ToggleTheme/>
            </ul>
            : ""
            }
        </nav>
      <div className="home">
        <h1>Avaliações de {titulo}</h1>
        <main>
          <table>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Status</th>
                <th>Nota</th>
                <th>Usuário</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.values(data).sort(function(a, b) { return b.nota - a.nota } ).map(anime => (
                  <tr key={anime._id}>
                    <td>{anime.titulo}</td>
                    <td>{anime.status_}</td>
                    <td>{anime.nota}</td>
                    <td><Link to={'/users/' + anime.user}>{anime.user}</Link></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
}

