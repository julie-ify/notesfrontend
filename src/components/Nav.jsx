import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../redux/appState';
import { useNavigate } from 'react-router';

const Nav = (props) => {
  const navigate = useNavigate();
  
  const {state, dispatch } = useAppState();
  const handleChange = () => {
    dispatch({type: "logout"})
    localStorage.removeItem("auth");
    navigate("/")
  }
  return <header>
    <h1>Juliana's Note Taking App</h1>
    <p>{localStorage.getItem("auth") ? `Logged in user: ${JSON.parse(localStorage.getItem("auth")).username}`
 : null }</p>
    <nav>
      { state.token ? <button onClick={handleChange}>logout</button> : <>
        {/* <Link to='/'><div>Home</div></Link> */}
        <Link to='/auth/signup'><div>Signup</div></Link>
        <Link to='/auth/login'><div>Login</div></Link>
      </> }
    </nav>
  </header>
}

export default Nav;