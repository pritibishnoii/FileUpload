const express= require('express')

const router= express.Router()

const {localFileUpload,imageUpload,uploadVedio}  = require('../controllers/fileUpload')


// api routes 
router.post('/localFileUpload',localFileUpload)
router.post('/imageupload',imageUpload)
router.post('/uploadVedio',uploadVedio)


module.exports= router