import React, { useEffect, useState } from 'react'
import './cadastro.css'
import Menu from '../../components/Menu/Menu';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const navigate = useNavigate()
  const [statuscad, setStatuscad] = useState({
    erro: '',
    mensagem:''
  })
  const [cadastro, setCadastro] = useState({
    username: '',
    email: '',
    senha: ''
  })
  const valorCadastro = e => setCadastro({...cadastro, [e.target.name]: e.target.value})

  const handleClickCadastro = async e =>{
    e.preventDefault();
    Axios.post("https://animecentral-reactjs-nodejs.onrender.com/user",{
      username: cadastro.username,
      email: cadastro.email,
      senha: cadastro.senha
    }).then((response) => {
      if(response.data.erro){
        setStatuscad({
          erro: response.data.erro,
          mensagem: response.data.message
        });
      }else{
        setStatuscad({
          erro: response.data.erro,
          mensagem: response.data.message
        });
        setTimeout(function() {
          navigate("/login");
        }, 3000);
      }
    });
  }
  return (
    <>
        <Menu/>
        <main>
            <h1>Cadastre-se</h1>
            { statuscad.erro ? <p className="messageErro">{statuscad.mensagem}</p> : "" }
            { !statuscad.erro? <p className="messageSucess">{statuscad.mensagem}</p> : "" }
            <form className='cadastro' onSubmit={handleClickCadastro}>
                <label htmlFor="username">Nome de usuário:</label><br />
                <input type="text" name='username' onChange={valorCadastro}/><br />
                <label htmlFor="email">E-mail:</label><br />
                <input type="email" name='email' onChange={valorCadastro}/><br />
                <label htmlFor="senha">Senha:</label><br />
                <input type="password" name='senha' onChange={valorCadastro}/><br />
                <button type='submit'>Entrar</button>
            </form>
            <p className="login">Já possui conta? Faça o <a href="/login">Login</a></p>
        </main>
    </>
  )
}
