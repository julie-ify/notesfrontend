const GETNOTES = 'notes/getNotes';
const ADDNOTE = 'notes/addNote';
const DELETENOTE = 'notes/deleteNote';
const EDITNOTE = 'notes/editNote';
const ERROR = 'notes/error';

const initialState = {
	notes: [],
	url: 'http://localhost:3000/notes/',
	error: {},
};

export const addNoteToApi = (noteData) => async (dispatch) => {
	try {
		const responseInJson = await fetch(initialState.url, {
			method: 'post',
			headers: {
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('auth')).token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(noteData),
		});

		if (!responseInJson.ok) {
			dispatch({
				type: ERROR,
				payload: response,
			});
		} else {
			const response = await responseInJson.json();
			dispatch({
				type: ADDNOTE,
				payload: response,
			});
		}
	} catch (error) {
		throw new Error(error);
	}
};

export const editNoteFromApi = (noteData, id) => async (dispatch) => {
	const responseInJson = await fetch(`${initialState.url}${id}`, {
		method: 'put',
		headers: {
			Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(noteData),
	});
	const response = await responseInJson.json();
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
	await fetch(`${initialState.url}${id}`, {
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
		case ERROR:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;
