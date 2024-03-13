import React from 'react'
import { ToggleTheme } from '../../Themes/ToggleTheme'
import './menu.css'

export default function Menu() {
    const[menuAberto, setMenu] = React.useState(false);
    const logout = () => {localStorage.clear(); window.location.reload()}

  return (
    <>
    <nav>
        <a className='logo' href="/"><img src="./imgs/logo-n.png" alt="logo Anime Central nas cores branco e cinza" /></a>
        <input type="checkbox" name="" id="input-checkbox" className="input-checkbox"/>
        <label htmlFor="input-checkbox" className="nav-button" onClick={() => setMenu(!menuAberto)}>
            <span></span>
        </label>
        { 
        window.location.pathname === '/' && localStorage.getItem("user") ? 
        <ul className={ menuAberto ? 'menu-mobile' : 'menu'}>
            <li><a href="/adicionar">Adicionar Anime</a></li>
            <li><a href="/meusanimes">Meus animes</a></li>
            <ToggleTheme/>
            <i class="fa-solid fa-right-from-bracket" onClick={logout}></i>
        </ul>
        : ""
    }
        { 
        window.location.pathname === '/' && localStorage.getItem("user") === null ? 
        <ul className={ menuAberto ? 'menu-mobile' : 'menu'}>
            <li><a href="/login">Login</a></li>
            <li><a href="/cadastro">Cadastre-se</a></li>
            <ToggleTheme/>
        </ul>
        : ""
    }
        { 
        window.location.pathname === '/adicionar'? 
        <ul className={ menuAberto ? 'menu-mobile' : 'menu'}>
            <li><a href="/">Home</a></li>
            <li><a href="/meusanimes">Meus animes</a></li>
            <ToggleTheme/>
            <i class="fa-solid fa-right-from-bracket" onClick={logout}></i>
        </ul>
        : ""
    }
        { 
        window.location.pathname === '/meusanimes'? 
        <ul className={ menuAberto ? 'menu-mobile' : 'menu'}>
            <li><a href="/">Home</a></li>
            <li><a href="/adicionar">Adicionar Anime</a></li>
            <ToggleTheme/>
            <i class="fa-solid fa-right-from-bracket" onClick={logout}></i>
        </ul>
        : ""
    }
        { 
        window.location.pathname === '/cadastro'? 
        <ul className={ menuAberto ? 'menu-mobile' : 'menu'}>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <ToggleTheme/>
        </ul>
        : ""
    }
        { 
        window.location.pathname === '/login'? 
        <ul className={ menuAberto ? 'menu-mobile' : 'menu'}>
            <li><a href="/">Home</a></li>
            <li><a href="/cadastro">Cadastre-se</a></li>
            <ToggleTheme/>
        </ul>
        : ""
    }
    </nav>
    </>
  )
}
