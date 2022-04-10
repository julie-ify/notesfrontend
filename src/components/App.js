import '../styles/App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';
import NoteForm from '../forms/Form';
import Nav from './Nav';
import { useAppState } from '../redux/appState';
import Footer from './Footer';

const App = () => {
	const navigate = useNavigate();
	const { dispatch } = useAppState();
	React.useEffect(() => {
		const auth = JSON.parse(localStorage.getItem('auth'));
		if (auth) {
			dispatch({ type: 'auth', payload: auth });
			navigate('/dashboard');
		} else {
			navigate('/');
		}
	}, []);

	return (
		<div className="App">
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth/:form" element={<Auth />} />
				<Route path="/notes/:type/:id" element={<NoteForm />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
