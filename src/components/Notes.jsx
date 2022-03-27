import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotesFromApi, deleteNotesFromApi } from '../redux/reducer/notes';
import NoteForm from '../forms/Form'

const Notes = () => {
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes);

  React.useEffect(() => {
    dispatch(getNotesFromApi())
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteNotesFromApi(id))
  }


  return (
    <>
      <ul>
        {notes && notes.map((note) => (
            <li key={note.id}>
              <p>Note title: {note.title}</p>
              <p>Note body: {note.body}</p>
              <p>Created date: {note.created_at}</p>
              <button onClick={() => handleDelete(note.id)}>Delete Note</button>
            </li>
        ))}
      </ul>
      <NoteForm />
    </>
  )
}

export default Notes;