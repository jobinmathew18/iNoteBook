import React, { useContext,useState } from 'react'
import NoteContext from '../Context/notes/NoteContext'

function AddNote(props) {
    const context = useContext(NoteContext)
    const {addNote} = context
    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleSubmit = (e)=>{
        e.preventDefault();             //this code will stop page from reloading after submit
        addNote(note.title, note.description, note.tag)                   //addNote is a function which came from NoteContext-->NoteState
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Note added successfully", "success")
    }

    const onChange = (e)=>{
        //[e.target.name] means we are extracting the "name" attribute's value of the form and e.target.value means we are extracting "value" attribute's value of the form.
        //below code means that we are overriding values of "[e.target.name]: e.target.value" in our existing "note" state object.
        //if we dont write ...note then setNote() will delete the existing key-value pair. But with ...note, only the value of the key will update without 
        //deleting the existing key-value pair.
        setNote({...note, [e.target.name]: e.target.value})        //note:in this case "key" inside usestate should be same as the value of "name" attribute of the form
        // console.log(e.target.name)
    }

    return ( 
        <div>
            {/* form to add note */}
            <div className="container my-3">
                <h1>Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        {/*we have written  value={note.title} because after adding note we want that the input should get empty */}
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} value={note.title} required/>    
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} required/>
                    </div>
                    <button disabled={note.title.length<3 || note.description.length<5 || note.tag.length<3} type="submit" className="btn btn-primary" 
                    onClick={handleSubmit}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote