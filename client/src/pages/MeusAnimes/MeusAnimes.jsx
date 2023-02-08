import React from 'react'
import Menu from '../../components/Menu/Menu'
import { Link } from 'react-router-dom';
import './MeusAnimes.css'
import Axios from 'axios';

export default function MeusAnimes() {
    var username = localStorage.getItem("user");

    const [data, setData] = React.useState([]);
    const [id, setId] = React.useState('');
    const [status, setStatus] = React.useState({
      type: '',
      mensagem: ''
    });

    function sair(){
      localStorage.clear();
    }
  
    React.useEffect(() => {
      const getAnimes = () => {
        Axios.post("/meusanimes",{
        user: username
        }).then((response) => {
          setData(response.data)
        });
      }
      getAnimes();
      const apagarAnime = async (idAnime) => {
        //console.log(idAnime);
        Axios.post("/apagar",{
          id: idAnime
        }).then((response) => {
            setStatus({
              erro: response.data.erro,
              mensagem: response.data.msg,
            })
        }).catch(() =>{
          setStatus({
            type: 'erro',
            mensagem: 'Não foi possível excluir este anime, tente mais tarde!'
          })
        })
        setTimeout(function() {
          window.location.pathname = "/meusanimes";
        }, 3000);
      };

      if(id === ''){

      }else{
        apagarAnime(id);
      }
      
    },[username, id])

  return (
    <>
        <Menu />
        <div className="animes">
            <h1>Melhores Animes</h1>
            <h2>{username}</h2>
            { status.erro === true ? <p className="messageErro">{status.mensagem}</p> : "" }
            { status.erro === false ? <p className="messageSucess">{status.mensagem}</p> : "" }
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
                            <td><Link to={ "/editar/" + anime.id }><i class="fa-solid fa-pen-to-square"></i></Link>
                            <i class="fa-regular fa-trash-can" onClick={() => setId(anime.id)}></i></td>
                            
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
