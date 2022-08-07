import '../styles/Form.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { addNoteToApi, editNoteFromApi } from '../redux/reducer/notes';
import Counter from '../components/Counter';

const NoteForm = () => {
	const dispatch = useDispatch();
	const notes = useSelector((state) => state.notes);
	const { type, id } = useParams();
	let note = notes.find((note) => note.id === parseInt(id));
	//console.log(type, id, note);
	let navigate = useNavigate();

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

	//React.useEffect(() => {
	//	const btn = document.getElementById('submit-note-btn');
	//	if (titleCounter > 150 || bodyCounter > 250) {
	//		btn.disabled = true;
	//	}
	//}, []);

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
		const btn = document.getElementById('submit-note-btn');
		if (50 - titleCounter <= 0 || 250 - bodyCounter <= 0) {
			btn.disabled = true;
		} else {
			btn.disabled = false;
		}
	};

	//console.log(bodyCounter, titleCounter);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (50 - titleCounter <= 0 || 250 - bodyCounter <= 0) {
			return;
		} else {
			if (type === 'add') {
				dispatch(addNoteToApi(noteState));
			}
			if (type === 'edit') {
				dispatch(editNoteFromApi(noteState, id));
			}
			navigate('/dashboard');
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="note-form">
				<Link to="/dashboard">
					<i className="fa fa-long-arrow-left" aria-hidden="true"></i>
				</Link>
				<textarea
					type="text"
					value={noteState.title}
					placeholder="title"
					name="title"
					onChange={handleChange}
					className="title"
				/>
				<Counter noteLength={titleCounter} type={'title'} note={note} />
				<textarea
					type="text"
					value={noteState.body}
					placeholder="notes"
					name="body"
					onChange={handleChange}
					className="notes"
				/>
				<Counter noteLength={bodyCounter} type={'body'} note={note} />
				<button id="submit-note-btn" type="submit" disabled={false}>
					{type}
				</button>
			</form>
		</>
	);
};

export default NoteForm;
