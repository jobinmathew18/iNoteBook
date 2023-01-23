import React, { useContext } from 'react'
import NoteContext from '../Context/notes/NoteContext'

function NoteItem(props) {
    const context = useContext(NoteContext)
    const {deleteNote} = context
    const { note, updateNote } = props

    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{ "width": "18rem" }}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                        {/* below we have used arrow function inside onclick() because we have passed parameter inside deleteNote() */}
                        <i className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id); props.showAlert("Note deleted successfully", "success")}}></i>         
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem