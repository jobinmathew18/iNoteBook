import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
    const initialNotes = []

    const [notes, setNotes] = useState(initialNotes)
    // console.log(notes)


    //get all notes
    const getNotes = async () => {
        //API call
        const response = await fetch('http://localhost:5000/api/notes/fetchallnotes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()  
        console.log(json)   
        setNotes(json)
    } 


    //add a note
    const addNote = async (title, description, tag) => {        //this parameter value is then sent to body and then through body, api will send data to database.
        //API call
        const response = await fetch('http://localhost:5000/api/notes/addnote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json()  
        console.log(json)  
        
        //to update the front end
        setNotes(notes.concat(json))                    //concat returns an array whereas push updates an array
        
        //we can also show updated notes like this in the frontend but the problem is that it will call api twice, first editNote() and then getNote()
        // getNotes();
    }

    //delete note
    const deleteNote = async (id) => {
        //API call
        const url = `http://localhost:5000/api/notes/deletenote/${id}`
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        console.log(`note with id ${id} is deleted`)

        //to update the front end
        const newNotes = notes.filter((note) => note._id !== id)
        setNotes(newNotes)

        //we can also show updated notes like this in the frontend but the problem is that it will call api twice, first editNote() and then getNote()
        // getNotes();
    }

    //update note
    const editNote = async (id, title, description, tag) => {
        //API call
        const url = `http://localhost:5000/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json()
        console.log(json)

        //to update the front end
        let newNotes = JSON.parse(JSON.stringify(notes))         //deep copy    //you have to create deep copy otherwise setnotes() will not update in realtime in frontend
        for (let index = 0; index < newNotes.length; index++) {
            if(newNotes[index]._id === id){
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag 
                break;
            }     
            setNotes(newNotes)
        }

        //we can also show updated notes like this in the frontend but the problem is that it will call api twice, first editNote() and then getNote()
        // getNotes();

    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote}}>           
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
