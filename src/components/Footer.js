import React from 'react';
import '../styles/Footer.css';
import { NavLink } from 'react-router-dom';

export default function Footer() {
	return (
		<footer>
			<ul>
				<li>Hello</li>

				<li className="add">
					<NavLink to={`/notes/add/add`}>
						<div>
							<i className="fa fa-plus-circle fa-5x"></i>
						</div>
					</NavLink>
				</li>
				<li>Hello</li>
			</ul>
		</footer>
	);
}
