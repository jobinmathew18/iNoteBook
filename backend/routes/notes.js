const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const User = require('../models/User')
const {body, validationResult} = require('express-validator')


//get all the notes
router.get('/fetchallnotes', fetchuser, async (req,res)=>{
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)     
    } catch (error) {
        res.status(500).json({message: "some error occured", errorDescription: error.message})
    }
})


//add a new note
router.post('/addnote', fetchuser,[
    body('title', "Enter a valid title").isLength({min: 3}),
    body('description', "Description must be atleast 5 characters").isLength({min: 5})
], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const {title, description, name, tag} = req.body;

        const namebyID = await User.findById({_id: req.user.id}) 
        // console.log(namebyID)

        const notes = new Notes({                                   //creating a note of a user in database
            //req.user is from "fetchuser" middleware
            user: req.user.id, name: namebyID.name, title, description, tag
        })
        const savedNotes = await notes.save()
        res.json(savedNotes) 

    } catch (error) { 
        console.log(error)
        res.status(500).json({message: "some error occured", errorDescription: error.message})
    }
})
 

//update an existing note (user can update his/her notes only)
//here, :id will be equal to the id of note stored in database
router.put('/updatenote/:id', fetchuser, async(req,res)=>{
    const {title, description, tag} = req.body
    try {
        const newNote = {}
        // console.log(newNote)
        if(title){newNote.title = title}
        if(description){newNote.description = description} 
        if(tag){newNote.tag = tag}
        // console.log(newNote)
    
        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        // console.log(note)
    
        if(!note){
            return res.status(404).send("Note Not found")   
        }
    
        //if the user tries to access the another user's notes then send("not allowed")
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed")
        }
    
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note})
    } catch (error) { 
        console.log(error)
        res.status(500).json({message: "some error occured", errorDescription: error.message})
    }
})



//delete note (user can delete his/her notes only)
router.delete('/deletenote/:id', fetchuser, async (req,res)=>{
    try {
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(404).send("Note not found")
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({status: "note deleted"})
    } catch (error) { 
        console.log(error)
        res.status(500).json({message: "some error occured", errorDescription: error.message})
    }
})


module.exports = router