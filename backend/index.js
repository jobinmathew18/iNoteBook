const express = require('express')
const cors = require('cors')                    //cors is basically used by browser so that browswer can directly request the api in order to fetch data.
require('./db')

const app = express()               

app.use(cors())
app.use(express.json())                 //used to access the body of the route request
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



app.listen(5000, ()=>{
    console.log("Listening to port 5000")
})




