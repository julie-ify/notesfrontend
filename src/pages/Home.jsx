import React from 'react';
import image from '../assets/logo2.png';
import '../styles/Home.css';

const Home = (props) => {
	return (
		<div className="logo">
			<h1>Quick Note App</h1>
			<img src={image} />
		</div>

	);
};

export default Home;
