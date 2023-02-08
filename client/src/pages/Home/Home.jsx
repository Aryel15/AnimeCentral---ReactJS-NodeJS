import './home.css';
import React from 'react'
import Menu from '../../components/Menu/Menu';
import { Link } from 'react-router-dom';
import Axios from 'axios'

export default function Home() {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    Axios.get("/home")
    .then((response) => {
       setData(response.data)
    });
  },[])

  return (
    <>
      <Menu/>
      <div className="home">
        <h1>Melhores Animes</h1>
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

