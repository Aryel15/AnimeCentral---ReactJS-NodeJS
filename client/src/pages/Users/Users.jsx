import './Users.css';
import '../../components/Menu/menu.css';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToggleTheme } from '../../Themes/ToggleTheme'
import Axios from 'axios';

export default function Users() {
  const {user} = useParams();
  const[menuAberto, setMenu] = React.useState(false);

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getAnimes = () => {
      Axios.post("http://localhost:3001/meusanimes",{
      user: user
      }).then((response) => {
        setData(response.data)
      });
    }
    getAnimes();
  },[user])

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
        <h1>Animes</h1>
        <h2>{user}</h2>
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
                  <tr key={anime.id}>
                    <td><Link to={'/animes/' + anime.titulo}>{anime.titulo}</Link></td>
                    <td>{anime.status_}</td>
                    <td>{anime.nota}</td>
                    <td>{anime.user}</td>
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

