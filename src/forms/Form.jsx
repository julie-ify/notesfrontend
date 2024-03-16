import '../styles/Form.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { addNoteToApi, editNoteFromApi } from '../redux/reducer/notes';

const NoteForm = () => {
	const dispatch = useDispatch();
	const notes = useSelector((state) => state.notes);
	const { type, id } = useParams();
	let note = notes.find((note) => note.id === parseInt(id));
	let navigate = useNavigate();

	const [error, setError] = useState('');
	const [noteState, setNoteState] = React.useState(
		note
			? {
					title: note.title,
					body: note.body,
			  }
			: {
					title: '',
					body: '',
			  }
	);
	const [bodyCounter, setBodyCounter] = useState(note ? note.body.length : 0);
	const [titleCounter, setTitleCounter] = useState(
		note ? note.title.length : 0
	);

	const handleChange = (event) => {
		setNoteState({
			...noteState,
			[event.target.name]: event.target.value,
		});

		if (event.target.name === 'title') {
			setTitleCounter(event.target.value.length);
		} else {
			setBodyCounter(event.target.value.length);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (titleCounter < 3) {
			setError('title is too short (minimum is 3 characters)');
			return;
		}

		if (bodyCounter < 3) {
			setError('body is too short (minimum is 3 characters)');
			return;
		}

		if (type === 'add') {
			dispatch(addNoteToApi(noteState));
		}
		if (type === 'edit') {
			dispatch(editNoteFromApi(noteState, id));
		}
		navigate('/dashboard');
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="note-form">
				<Link to="/dashboard">
					<span className="primary-color btn-font">Go back</span>
				</Link>
				<textarea
					type="text"
					value={noteState.title}
					placeholder="title"
					name="title"
					onChange={handleChange}
					className="title"
				/>
				<textarea
					type="text"
					value={noteState.body}
					placeholder="notes"
					name="body"
					onChange={handleChange}
					className="notes"
				/>
				<button id="submit-note-btn" type="submit" disabled={false}>
					{type}
				</button>
				{error && <span>{error}</span>}
			</form>
		</>
	);
};

export default NoteForm;
