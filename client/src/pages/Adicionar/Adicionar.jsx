import React, { useEffect, useState } from 'react'
import './adicionar.css'
import Menu from '../../components/Menu/Menu';
import Axios from 'axios';

export default function Adicionar() {
    var user = localStorage.getItem("user");
    const [anime, setAnime] = useState({
        titulo: '',
        status_: '',
        nota:'',
        user:''
    });

    const [status, setStatus] = useState({
      type: '',
      mensagem: ''
    })
    let valorInput = e => setAnime({...anime, [e.target.name]: e.target.value, user})

    const cadAnime = async e =>{
        e.preventDefault();
        console.log(anime);
        if(Object.keys(anime).every(key => anime[key] !== '')){
          Axios.post("https://animecentral-reactjs-nodejs.onrender.com//anime",{
            titulo: anime.titulo,
            status_: anime.status_,
            nota: anime.nota,
            user: anime.user
          }).then((response) => {
              setStatus({
                erro: !response.data.data ? true : false,
                mensagem: response.data.message,
              })
              setAnime({
                titulo: '',
                status_: '',
                nota:'',
                user:''
            })
          }).catch(() =>{
            setStatus({
              type: 'erro',
              mensagem: 'Anime não adicionado, tente mais tarde!'
            })
          })
        }
    }

    const [data, setData] = useState([]);
    const getAnimes = () => {
      Axios.get(`https://animecentral-reactjs-nodejs.onrender.com//anime/user/${user}`)
      .then((response) => {
        setData(response.data)
      });
    }
  
    useEffect(() => {
      getAnimes();
    },[])


  return (
    <>
      <Menu/>
      <div className="adicionar">
        <h1>Adicionar anime</h1>
        { status.erro === true ? <p className="messageErro">{status.mensagem}</p> : "" }
        { status.erro === false? <p className="messageSucess">{status.mensagem}</p> : "" }

        <form className='cadastro' action='/' onSubmit={cadAnime}>
          <label htmlFor="titulo">Titulo:</label><br />
          <input type="text" name='titulo' onChange={valorInput} list="titulo"/>
          <datalist name="titulo" id="titulo">
            {
              Object.values(data).filter((anime, a, b) => String(anime).indexOf(a.titulo) === b.titulo).map(anime => (
                <option key={anime.titulo} value={anime.titulo} />
              ))
            }
          </datalist><br />
          <label htmlFor="status_">Status:</label><br />
          <input type="text" name='status_' onChange={valorInput} list="status" id='status_'/>
          <datalist name="status_" id="status">
            <option value='Completo'/>
            <option value='Assistindo'/>
            <option value='Dropou'/>
          </datalist><br />
          <label htmlFor="nota">Nota:</label><br />
          <input type="number" min="1" max="10" name='nota' onChange={valorInput}/><br />
          <button type='submit'>Cadastrar</button>
        </form>
      </div>
    </>
  )
}
