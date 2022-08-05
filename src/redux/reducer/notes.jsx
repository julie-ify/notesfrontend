const GETNOTES = 'notes/getNotes';
const ADDNOTE = 'notes/addNote';
const DELETENOTE = 'notes/deleteNote';
const EDITNOTE = 'notes/editNote';

const initialState = {
	notes: [],
	url: 'https://julienotesbackend.herokuapp.com/notes/',
};

export const addNoteToApi = (noteData) => async (dispatch) => {
	const responseInJson = await fetch(initialState.url, {
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(noteData),
	});
	const response = await responseInJson.json();
	dispatch({
		type: ADDNOTE,
		payload: response,
	});
};

export const editNoteFromApi = (noteData, id) => async (dispatch) => {
	const responseInJson = await fetch(
		`https://julienotesbackend.herokuapp.com/notes/${id}`,
		{
			method: 'put',
			headers: {
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('auth')).token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(noteData),
		}
	);
	const response = await responseInJson.json();
	//console.log(response, id, noteData);
	dispatch({
		type: EDITNOTE,
		payload: response,
		notesId: id,
	});
};

export const getNotesFromApi = () => async (dispatch) => {
	const responseInJson = await fetch(initialState.url, {
		headers: {
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token,
		},
	});
	const response = await responseInJson.json();
	dispatch({
		type: GETNOTES,
		payload: response,
	});
};

export const deleteNotesFromApi = (id) => async (dispatch) => {
	await fetch(`https://julienotesbackend.herokuapp.com/notes/${id}`, {
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token,
		},
	});
	dispatch({
		type: DELETENOTE,
		payload: id,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADDNOTE:
			return {
				...state,
				notes: [...state.notes.concat(action.payload)],
			};
		case EDITNOTE:
			const index = state.notes.findIndex((note) => note.id === action.notesId);
			const newNotesArray = [...state.notes];
			newNotesArray[index] = action.payload;
			return {
				...state,
				notes: newNotesArray,
			};

		case GETNOTES:
			return {
				...state,
				notes: action.payload,
			};
		case DELETENOTE:
			return {
				...state,
				notes: [...state.notes.filter((note) => note.id !== action.payload)],
			};

		default:
			return state;
	}
};

export default reducer;

//case EDITNOTE:
//			const index = state.notes.map((note) => {
//				return ((note.id === action.notesId) ? action.payload : item)
//			})
//			return {
//				...state,
//				notes: index
//			}
