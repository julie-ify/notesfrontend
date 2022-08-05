import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useAppState } from '../redux/appState';
import Button from '@material-ui/core/Button';
import '../styles/Nav.css'

const Nav = () => {
	const navigate = useNavigate();

	const { state, dispatch } = useAppState();
	const handleChange = () => {
		dispatch({ type: 'logout' });
		localStorage.removeItem('auth');
		navigate('/');
	};
	return (
		<header>
			
			<h1>
				{localStorage.getItem('auth')
					? `${JSON.parse(localStorage.getItem('auth')).username.charAt(0).toUpperCase()}${JSON.parse(localStorage.getItem('auth')).username.slice(1)}'s Notes`
					: null}
			</h1>
			<nav>
				{state.token ? (
					<Button variant="text" color="secondary" onClick={handleChange}>
						Logout
					</Button>
				) : (
					<>
						<Link to="/auth/signup">
							<div>Signup</div>
						</Link>
						<Link to="/auth/login">
							<div>Login</div>
						</Link>
					</>
				)}
			</nav>
		</header>
	);
};

export default Nav;
