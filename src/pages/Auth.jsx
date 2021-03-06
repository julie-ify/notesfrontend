import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppState } from '../redux/appState';
import { useNavigate } from 'react-router';

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
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={formData.username}
				placeholder="username"
				name="username"
				onChange={handleChange}
			/>
			<input
				type="password"
				value={formData.password}
				placeholder="password"
				name="password"
				onChange={handleChange}
			/>
			<input type="submit" value={form} />
		</form>
	);
};

export default Auth;
