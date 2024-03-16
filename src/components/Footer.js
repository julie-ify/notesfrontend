import React from 'react';
import '../styles/Footer.css';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
	const navigate = useNavigate();
	return (
		<footer>
			<div onClick={() => navigate(`/notes/add/add`)}>
				<i className="fa-solid fa-pen-to-square"></i>
			</div>
		</footer>
	);
}
