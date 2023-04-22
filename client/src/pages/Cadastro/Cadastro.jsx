import React from 'react'
import './cadastro.css'
import Menu from '../../components/Menu/Menu';
import Axios from 'axios';

export default function Cadastro() {
  const [statuscad, setStatuscad] = React.useState({
    erro: '',
    mensagem:''
  })
  const [cadastro, setCadastro] = React.useState({
    username: '',
    email: '',
    senha: ''
  })
  const valorCadastro = e => setCadastro({...cadastro, [e.target.name]: e.target.value})

  const handleClickCadastro = async e =>{
    e.preventDefault();
    Axios.post("https://backendanime-ljfk.onrender.com/cadastro",{
      username: cadastro.username,
      email: cadastro.email,
      senha: cadastro.senha
    }).then((response) => {
      if(response.data.erro === true){
        setStatuscad({
          erro: response.data.erro,
          mensagem: response.data.msg
        });
      }else{
        setStatuscad({
          erro: response.data.erro,
          mensagem: response.data.msg
        });
        setTimeout(function() {
          window.location.pathname = "/login";
        }, 3000);
      }
    });
  }
  return (
    <>
        <Menu/>
        <main>
            <h1>Cadastre-se</h1>
            { statuscad.erro === true ? <p className="messageErro">{statuscad.mensagem}</p> : "" }
            { statuscad.erro === false? <p className="messageSucess">{statuscad.mensagem}</p> : "" }
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
