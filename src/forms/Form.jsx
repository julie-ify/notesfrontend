import '../styles/Form.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { addNoteToApi, editNoteFromApi } from '../redux/reducer/notes';
import Button from '@material-ui/core/Button';
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

	//console.log(bodyCounter, titleCounter);

	const handleSubmit = (event) => {
		event.preventDefault();
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
				<Button
					type="submit"
					style={{
						textTransform: 'capitalize',
						fontSize: 17,
					}}
					size="small"
					variant="contained"
					color="primary">
					{type}
				</Button>
			</form>
		</>
	);
};

export default NoteForm;
