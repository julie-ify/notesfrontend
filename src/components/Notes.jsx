import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { getNotesFromApi, deleteNotesFromApi } from '../redux/reducer/notes';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/Notes.css';
import Footer from './Footer';

const Notes = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
				{notes.length === 0 ? (
					<div className="empty-note">
						<i className="fa-solid fa-triangle-exclamation"></i> There Are No
						Notes Yet <i className="fa-solid fa-triangle-exclamation"></i>
					</div>
				) : (
					<ul>
						{notes &&
							notes.map((note) => (
								<li key={note.id}>
									<p>Title: {note.title}</p>
									<p>{note.body}</p>
									<p>
										Created date:{' '}
										{formatter.format(Date.parse(note.created_at))}
									</p>
									<div className="btn-style">
										<Button
											style={{
												textTransform: 'capitalize',
												fontSize: 17,
												color: '#f98888',
											}}
											size="small"
											variant="text"
											onClick={() => handleDelete(note.id)}
										>
											Delete Note
										</Button>
										<Button
											style={{
												textTransform: 'capitalize',
												fontSize: 17,
											}}
											size="small"
											variant="text"
										>
											<Link to={`/notes/edit/${note.id}`}>
												<div>Edit Note</div>
											</Link>
										</Button>
									</div>
								</li>
							))}
					</ul>
				)}
				<footer>
					<div onClick={() => navigate(`/notes/add/add`)}>
						<i className="fa-solid fa-pen-to-square"></i>
					</div>
				</footer>
			</div>
		</>
	);
};

export default Notes;
