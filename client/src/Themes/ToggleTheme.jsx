import React, { useContext, useState } from 'react'
import { ThemeContext } from './ThemeContext'
import './theme.css'


export const ToggleTheme = () => {
 const context = useContext(ThemeContext)
 const [theme, setTheme] = useState(true);
 function temas(){
  context.toggleThemeMode();
  setTheme(!theme);
 }

return (
    <button onClick={temas} className='theme'>
      {
        theme === true ? 
        <p className='light' title='tema claro'>
          <span className="material-symbols-outlined">light_mode</span>
          <span className="tema">Modo Claro</span>
        </p> 
          : 
        <p className='dark' title='tema escuro'>
          <span className="material-symbols-outlined">dark_mode</span>
          <span className="tema">Modo Escuro</span>
        </p>
      }
       
    </button>
  )
}