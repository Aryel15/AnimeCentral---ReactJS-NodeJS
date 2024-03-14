import React, { useEffect, useState } from 'react'
import Menu from '../../components/Menu/Menu'
import { Link, useNavigate } from 'react-router-dom';
import './MeusAnimes.css'
import Axios from 'axios';

export default function MeusAnimes() {
    var username = localStorage.getItem("user");

    const [data, setData] = useState([]);
    const [id, setId] = useState('');
    const [status, setStatus] = useState({
      type: '',
      mensagem: ''
    });

    const navigate = useNavigate()

    function sair(){
      localStorage.clear();
    }
  
    useEffect(() => {
        Axios.get(`https://animecentral-reactjs-nodejs.onrender.com//anime/user/${username}`)
        .then((response) => {
          setData(response.data)
        });
      
    },[username])

    const apagarAnime = (idAnime) => {
      //console.log(idAnime);
      Axios.delete(`https://animecentral-reactjs-nodejs.onrender.com//anime/${idAnime}`)
      .then((response) => {
        console.log(response);
          setStatus({
            erro: response.status !== 201,
            mensagem: response.data.message,
          })
      }).catch(() =>{
        setStatus({
          type: 'erro',
          mensagem: 'Não foi possível excluir este anime, tente mais tarde!'
        })
      })
      setTimeout(function() {
        navigate("/meusanimes")
      }, 3000);
    };

  return (
    <>
        <Menu />
        <div className="animes">
            <h1>Melhores Animes</h1>
            <h2>{username}</h2>
            { status.erro ? <p className="messageErro">{status.mensagem}</p> : "" }
            { !status.erro ? <p className="messageSucess">{status.mensagem}</p> : "" }
            <main>
                <table>
                    <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Status</th>
                        <th>Nota</th>
                        <th>Usuário</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Object.values(data).sort(function(a, b) {return b.nota - a.nota} ).map((anime) => (
                        <tr key={anime.id}>
                            <td>{anime.titulo}</td>
                            <td>{anime.status_}</td>
                            <td>{anime.nota}</td>
                            <td>{anime.user}</td>
                            <td><Link to={ "/editar/" + anime._id }><i class="fa-solid fa-pen-to-square"></i></Link>
                            <i class="fa-regular fa-trash-can" onClick={() => apagarAnime(anime._id)}></i></td>
                            
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
                <a href="/adicionar" className='link_adicionar'>+ Adicionar</a>
                <a href="/login" className='sair' onClick={sair}>Sair</a>
            </main>
        </div> 
    </>
  )
}
