const express = require('express')
require('dotenv').config()
const app = express()

// port 
const PORT = process.env.PORT

// add middlewar 
// parse the json
app.use(express.json())


// file upload  -- upload the file over the server
const fileUpload = require("express-fileupload")
// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))


//  connect to db 
const db = require('./config/database')
// call the database method 
db.connect()


// connect to the cloud 
const cloudinary = require('./config/cloudinary')
// call the cloudinaryConnect()
cloudinary.cloudinaryConnect()

// api routes 
const upload = require('./routes/fileUpload')
app.use('/api/v1/upload', upload)

// activate server 
app.listen(PORT, () => {
    console.log(`server is started at PORT ${PORT}`)
})