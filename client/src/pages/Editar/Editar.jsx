import React, { useState, useEffect } from 'react';
import './editar.css';
import '../../components/Menu/menu.css';
import { useParams } from 'react-router-dom';
import { ToggleTheme } from '../../Themes/ToggleTheme';
import Axios from 'axios';

export default function Editar() {
    const {id} = useParams();
    const [anime, setAnime] = useState({
      id:'',
      titulo: '',
      status_: '',
      nota:''
    });
    const [status, setStatus] = useState({
      type: '',
      mensagem: ''
    })
    let valorInput = e => setAnime({...anime, [e.target.name]: e.target.value, id})

      useEffect(() =>{
          Axios.get(`https://animecentral-reactjs-nodejs.onrender.com/anime/${id}`)
          .then((response) => {
            setAnime(response.data);
          });
      }, [id]);
      
      const editAnime = async e =>{
        e.preventDefault();

        Axios.put(`https://animecentral-reactjs-nodejs.onrender.com/anime/${anime.id}`,{
          titulo: anime.titulo,
          status_: anime.status_,
          nota: anime.nota,
          user: anime.user,
          id: anime.id
        }).then((response) => {
            setStatus({
              erro: response.data.erro,
              mensagem: response.data.message,
            })
        }).catch(() =>{
          setStatus({
            type: 'erro',
            mensagem: 'Anime não adicionado, tente mais tarde!'
          })
        })
      }
      const[menuAberto, setMenu] = useState(false);


  return (
    <>
      <nav>
        <a className='logo' href="/"><img src="../imgs/logo-n.png" alt="logo Anime Central nas cores branco e cinza" /></a>
        <input type="checkbox" name="" id="input-checkbox" className="input-checkbox"/>
        <label htmlFor="input-checkbox" className="nav-button" onClick={() => setMenu(!menuAberto)}>
            <span></span>
        </label>
        <ul className={ menuAberto ? 'menu-mobile' : 'menu'}>
            <li><a href="/">Home</a></li>
            <li><a href="/adicionar">Adicionar Anime</a></li>
            <li><a href="/meusanimes">Meus animes</a></li>
            <ToggleTheme/>
        </ul>
      </nav>
      <div className="adicionar">
        <h1>Editar anime</h1>
        { status.erro ? <p className="messageErro">{status.mensagem}</p> : "" }
        { !status.erro ? <p className="messageSucess">{status.mensagem}</p> : "" }
        <form className='cadastro' onSubmit={editAnime}>
          <label htmlFor="titulo">Titulo:</label><br />
          <input type="text" name='titulo' value={anime.titulo} onChange={valorInput}/><br />
          <label htmlFor="status_">Status:</label><br />
          <input type="text" name='status_' value={anime.status_} onChange={valorInput} list="status" id='status_'/>
          <datalist name="status_" id="status">
            <option value='Completo'/>
            <option value='Assistindo'/>
            <option value='Dropou'/>
          </datalist><br />
          <label htmlFor="nota">Nota:</label><br />
          <input type="number" min="1" max="10" name='nota' value={anime.nota} onChange={valorInput}/><br />
          <button type='submit'>Editar</button>
        </form>
      </div>
    </>
  )
}
