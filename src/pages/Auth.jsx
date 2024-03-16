import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppState } from '../redux/appState';
import { useNavigate } from 'react-router';
import '../styles/Auth.css';

const Auth = () => {
	const { form } = useParams();
	let navigate = useNavigate();

	const [formData, setFormData] = React.useState({
		username: '',
		password: '',
	});

	const [userData, setUserData] = React.useState(null);
	const { state, dispatch } = useAppState();

	React.useEffect(() => {
		if (userData) {
			const { token, user } = userData;
			console.log(userData)
			dispatch({ type: 'auth', payload: { token, username: user.username, role: user.role } });
			localStorage.setItem(
				'auth',
				JSON.stringify({ token, username: user.username, role: user.role })
			);
			navigate('/dashboard');
		}
	}, [userData]);

	const actions = {
		signup: () => {
			return fetch(state.url + '/users/', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
				.then((response) => response.json())
				.catch((error) => error);
		},
		login: () => {
			return fetch(state.url + '/login', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
				.then((response) => {
					if (!response.ok) {
						if (response.status === 401) {
							alert('Invalid username or password');
						} else {
							console.error('An error occurred:', error.message);
						}
					} else {
						return response.json();
					}
				})
				.catch((error) => {
					console.error('An error occurred:', error.message);
				});
		},
	};

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const error = document.createElement('p');
	error.className = 'error';

	const handleSubmit = (event) => {
		event.preventDefault();

		error.innerHTML = '';

		if (formData.username === '' || formData.password === '') {
			document.querySelector('.auth-form').appendChild(error);
			error.innerHTML =
				'<div><i className="fa-solid fa-triangle-exclamation"></i> username & password (>= 6 characters) is required <i className="fa-solid fa-triangle-exclamation"></i></div>';
		} else {
			actions[form]().then((data) => {
				setUserData(data);
			});
		}
	};

	return (
		<>
			<Link to={'/'} className="back-btn">
			<span className='primary-color btn-font'>Go back</span>
			</Link>
			<form onSubmit={handleSubmit} className="auth-form">
				<h1>{form}</h1>
				<input
					type="text"
					className="user-name"
					value={formData.username}
					placeholder="username"
					name="username"
					onChange={handleChange}
				/>
				<input
					type="password"
					className="user-password"
					value={formData.password}
					placeholder="password"
					name="password"
					onChange={handleChange}
				/>
				<input type="submit" value={form} className="authentication-btn" />
			</form>
		</>
	);
};

export default Auth;
