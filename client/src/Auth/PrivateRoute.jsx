const isAuthenticated = () => {
  if(localStorage.getItem("user") === null){
    return false;
  }else{
    return true;
  }
}


export const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : window.location.pathname = '/login';
  /*return(
    <Route {...rest} render={props => (
      isAuthenticated() === true ? (
        <Element {...props} />
      ) : (
        <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
      )
    )} />
  );*/

}