import React from 'react'
import './login.css'
import Menu from '../../components/Menu/Menu';
import Axios from 'axios'

export default function Login() {
  const [statuslog, setStatuslog] = React.useState({
    erro: '',
    mensagem:'',
    username: ''
  })
  const [login, setLogin] = React.useState({
    email: '',
    senha: ''
  })
  const valorLogin = e => setLogin({...login, [e.target.name]: e.target.value})

  const handleClickLogin = async e =>{
    e.preventDefault();
    Axios.post("https://backendanime-ljfk.onrender.com/login",{
      email: login.email,
      senha: login.senha
    }).then((response) => {
      if(response.data.erro === true){
        setStatuslog({
          erro: response.data.erro,
          mensagem: response.data.msg
        });
      }else{
        setStatuslog({
          erro: response.data.erro,
          mensagem: response.data.msg,
          username: response.data.username
        })

        var username = response.data.username;
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
