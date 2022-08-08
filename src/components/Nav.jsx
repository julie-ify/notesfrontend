import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useAppState } from '../redux/appState';
import Button from '@material-ui/core/Button';
import '../styles/Nav.css';

const Nav = () => {
	const navigate = useNavigate();

	const { state, dispatch } = useAppState();
	const handleChange = () => {
		dispatch({ type: 'logout' });
		localStorage.removeItem('auth');
		navigate('/');
	};
	return (
		<header className="nav-header">
			{state.token ? (
				<div className="signed-nav">
					<h1>
						{localStorage.getItem('auth')
							? `${JSON.parse(localStorage.getItem('auth'))
									.username.charAt(0)
									.toUpperCase()}${JSON.parse(
									localStorage.getItem('auth')
							  ).username.slice(1)}'s Notes`
							: null}
					</h1>
					<nav>
						<Button
							variant="text"
							style={{ color: '#f98888' }}
							onClick={handleChange}>
							Logout
						</Button>
					</nav>
				</div>
			) : (
				<div className="not-signed-nav">
					<Link to="/auth/signup" className="sign-up btn btn-outline-primary btn-lg">
						<div>Signup</div>
					</Link>
					<Link to="/auth/login" className="sign-in btn btn-outline-info btn-lg">
						<div>Login</div>
					</Link>
				</div>
			)}
		</header>
	);
};

export default Nav;
