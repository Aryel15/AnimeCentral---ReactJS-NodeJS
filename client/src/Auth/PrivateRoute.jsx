import { useNavigate } from 'react-router-dom'

const isAuthenticated = localStorage.getItem("user") === null ? false : true

export const PrivateRoute = ({ children }) => {
  return isAuthenticated ? children : window.location.pathname = '/login';
}