import React from 'react';
import { addNoteToApi } from '../redux/reducer/notes';
import { useDispatch } from 'react-redux'

const NoteForm = (props) => {
  const dispatch = useDispatch();

  const [ noteState, setNoteState ] = React.useState({
    title: '',
    body: ''
  })

  const handleChange = (event) => {
    setNoteState({
      ...noteState,
      [event.target.name] : event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addNoteToApi(noteState))
    setNoteState(
      {
        ...noteState,
        title: '',
        body: ''
      }
    )

  }
  
return (
  <form onSubmit={handleSubmit}>
    <input type='text' value={noteState.title} placeholder="title" name="title" onChange={handleChange} />
    <input type='text' value={noteState.body} placeholder="notes" name="body" onChange={handleChange} />
    <button>Submit</button>
  </form>
)
  
}

export default NoteForm;