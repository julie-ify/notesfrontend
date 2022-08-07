import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { getNotesFromApi, deleteNotesFromApi } from '../redux/reducer/notes';
import { Link } from 'react-router-dom';
import '../styles/Notes.css';
import Footer from './Footer';

const Notes = () => {
	const dispatch = useDispatch();

	const notes = useSelector((state) => state.notes);

	React.useEffect(() => {
		dispatch(getNotesFromApi());
	}, []);

	const handleDelete = (id) => {
		dispatch(deleteNotesFromApi(id));
	};
	const formatter = new Intl.DateTimeFormat('en-GB', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
	});

	return (
		<>
			<div className="notes-container">
				<ul>
					{notes &&
						notes.map((note) => (
							<li key={note.id}>
								<p>Title: {note.title}</p>
								<p>{note.body}</p>
								<p>
									Created date: {formatter.format(Date.parse(note.created_at))}
								</p>
								<div className="btn-style">
									<Button
										style={{
											textTransform: 'capitalize',
											fontSize: 17,
										}}
										size="small"
										variant="text"
										color="secondary"
										onClick={() => handleDelete(note.id)}>
										Delete Note
									</Button>
									<Button
										style={{
											textTransform: 'capitalize',
											fontSize: 17,
										}}
										size="small"
										variant="text"
										color="primary">
										<Link to={`/notes/edit/${note.id}`}>
											<div>Edit Note</div>
										</Link>
									</Button>
								</div>
							</li>
						))}
				</ul>
				{/*<NoteForm />*/}
			</div>
			<Footer />
		</>
	);
};

export default Notes;
