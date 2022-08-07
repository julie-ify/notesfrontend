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
			dispatch({ type: 'auth', payload: { token, username: user.username } });
			localStorage.setItem(
				'auth',
				JSON.stringify({ token, username: user.username })
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
			}).then((response) => response.json());
		},
		login: () => {
			return fetch(state.url + '/login/', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			}).then((response) => response.json());
		},
	};

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		actions[form]().then((data) => {
			setUserData(data);
		});
	};

	return (
		<>
			<Link to={'/'} className='back-btn'>
				<i className="fa fa-long-arrow-left"></i>
			</Link>
			<form onSubmit={handleSubmit} className='auth-form'>
				<input
					type="text"
					className='user-name'
					value={formData.username}
					placeholder="username"
					name="username"
					onChange={handleChange}
				/>
				<input
					type="password"
					className='user-password'
					value={formData.password}
					placeholder="password"
					name="password"
					onChange={handleChange}
				/>
				<input type="submit" value={form} className='authentication-btn'/>
			</form>
		</>
	);
};

export default Auth;
