import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { getNotesFromApi, deleteNotesFromApi } from '../redux/reducer/notes';
import { Link } from 'react-router-dom';

const Notes = () => {
	const dispatch = useDispatch();

	const notes = useSelector((state) => state.notes);

	React.useEffect(() => {
		dispatch(getNotesFromApi());
	}, [dispatch]);

	const handleDelete = (id) => {
		dispatch(deleteNotesFromApi(id));
	};

	return (
		<>
			<Link to={`/notes/add/add`}>
				<div>Add Note</div>
			</Link>
			<ul>
				{notes &&
					notes.map((note) => (
						<li key={note.id}>
							<p>Note title: {note.title}</p>
							<p>Note body: {note.body}</p>
							<p>Created date: {note.created_at}</p>
							<Button
								style={{
									textTransform: 'capitalize',
									fontSize: 17,
									marginRight: 20,
								}}
								size="small"
								variant="contained"
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
								variant="contained"
								color="primary">
								<Link to={`/notes/edit/${note.id}`}>
									<div>Edit Note</div>
								</Link>
							</Button>
						</li>
					))}
			</ul>
			{/*<NoteForm />*/}
		</>
	);
};

const deleteButton = () => {};

export default Notes;
