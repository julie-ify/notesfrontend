const GETNOTES = 'notes/getNotes';
const ADDNOTE = 'notes/addNote';
const DELETEBOOK = 'notes/deleteNote';

const initialState = {
  notes: [],
  url: 'https://julienotesbackend.herokuapp.com/notes/',
};


export const addNoteToApi = (noteData) => async (dispatch) => {
  const responseInJson = await fetch(initialState.url, {
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token,
      'Content-Type': 'application/json',
   },
    body: JSON.stringify(noteData)
  });
  const response = await responseInJson.json();
  dispatch({
    type: ADDNOTE,
    payload: response
  })
}

export const getNotesFromApi = () => async (dispatch) => {
  const responseInJson = await fetch(initialState.url, {
    headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token },
  });
  const response = await responseInJson.json();
  dispatch({
    type: GETNOTES,
    payload: response
  })
}

export const deleteNotesFromApi = (id) => async (dispatch) => {
  await fetch(`https://julienotesbackend.herokuapp.com/notes/${id}`, {
    method: 'delete',
    headers: {'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token },
  });
  dispatch({
    type: DELETEBOOK,
    payload: id
  })
}



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDNOTE:
      return {
        ...state,
        notes: [...state.notes.concat(action.payload)],
      }
    case GETNOTES:
      return {
        ...state,
        notes: action.payload,
      }
    case DELETEBOOK:
      return {
        ...state,
        notes: [...state.notes.filter((note) => note.id !== action.payload)],
      }

    default:
      return state;
  }
}

export default reducer;