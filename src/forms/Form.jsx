import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { addNoteToApi, editNoteFromApi } from '../redux/reducer/notes';

const NoteForm = () => {
	const dispatch = useDispatch();
	const { type, id } = useParams();
	console.log(type, id);
	let navigate = useNavigate();

	const [noteState, setNoteState] = React.useState({
		title: '',
		body: '',
	});

	const handleChange = (event) => {
		setNoteState({
			...noteState,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (type === 'add') {
			dispatch(addNoteToApi(noteState));
		} else {
			dispatch(editNoteFromApi(noteState, id));
		}
		setNoteState({
			...noteState,
			title: '',
			body: '',
		});
		navigate('/dashboard');
	};

	return (
		<>
			<Link to="/dashboard">Dashboard</Link>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={noteState.title}
					placeholder="title"
					name="title"
					onChange={handleChange}
				/>
				<input
					type="text"
					value={noteState.body}
					placeholder="notes"
					name="body"
					onChange={handleChange}
				/>
				<button>{type}</button>
			</form>
		</>
	);
};

export default NoteForm;
