import React, { useState, useEffect } from 'react'
import './login.css'
import Menu from '../../components/Menu/Menu';
import Axios from 'axios'

export default function Login() {
  const [statuslog, setStatuslog] = useState({
    erro: '',
    mensagem:'',
    username: ''
  })
  const [login, setLogin] = useState({
    email: '',
    senha: ''
  })
  const valorLogin = e => setLogin({...login, [e.target.name]: e.target.value})

  const handleClickLogin = async e =>{
    e.preventDefault();
    Axios.post(`https://animecentral-reactjs-nodejs.onrender.com/user/login`,{
      email: login.email,
      senha: login.senha
    }).then((response) => {
      console.log(response.data);
      if(!response.data.data){
        setStatuslog({
          erro: true,
          mensagem: response.data.message
        });
      }else{
        setStatuslog({
          erro: false,
          mensagem: response.data.message,
          username: response.data.data.username
        })

        var username = response.data.data.username;
        localStorage.setItem("user", username);
        
        setTimeout(function() {
          window.location.pathname = "/";
        }, 3000);
      }
    });
  }

  return (
    <>
        <Menu/>
        <main>
            <h1>Login</h1>
            { statuslog.erro === true ? <p className="messageErro">{statuslog.mensagem}</p> : "" }
            { statuslog.erro === false? <p className="messageSucess">{statuslog.mensagem}</p> : "" }
            <form className='login' onSubmit={handleClickLogin}>
                <label htmlFor="email">E-mail:</label><br />
                <input type="email" name='email' onChange={valorLogin}/><br />
                <label htmlFor="senha">Senha:</label><br />
                <input type="password" name='senha' onChange={valorLogin}/><br />
                <button type='submit'>Entrar</button>
            </form>
            <p className="cadastro">Ainda não possui conta? <a href="/cadastro">Cadastre-se</a></p>
        </main>
    </>
  )
}
