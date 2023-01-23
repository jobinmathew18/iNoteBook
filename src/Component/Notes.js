import { useState,useContext, useEffect, useRef } from 'react'
import NoteContext from '../Context/notes/NoteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';


function Notes(props) {
    const context = useContext(NoteContext)
    const { notes, getNotes, editNote } = context
    let navigate = useNavigate();

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    //fetching all notes
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()                  //it will run automatically that is why we have enclosed getNotes() inside useEffect()
        }else{
            navigate("/login");
        }
        // eslint-disable-next-line 
    }, [])

    const refClose = useRef(null)
    const handleSubmit = (e)=>{
        console.log("Note updated" , note)
        editNote(note._id, note.title, note.description, note.tag)             //this argument is sent to editNote context which is in NoteState..js file
        // console.log(note._id, note.title, note.description, note.tag)
        props.showAlert("Note updated successfully", "success")
        refClose.current.click();
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})        
        // console.log(e.target.name)
    }

    const ref = useRef(null)
    const updateNote = (currentNotes) => {
        console.log("update function clicked")
        ref.current.click()
        setNote(currentNotes)
        console.log(currentNotes)
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} value={note.title} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.title.length<3 || note.description.length<5 || note.tag.length<3} type="button"
                            className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className='container'>
                    {notes.lenghth === 0 && 'no notes to display'}
                </div>
                {notes.map((note) => {
                    // console.log(note)  
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} /> 
                })}
            </div>
        </>
    )
}

export default Notes 