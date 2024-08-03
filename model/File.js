const mongoos = require('mongoose')

const fileSchema = new mongoos.Schema({

    name: {
        type: String,
        require: true,
    },
    imageUrl: {
        type: String,

    },
    vedioUrl: {
        type: String,
    },
    tags: {
        type: String,

    },
    email: {
        type: String,
    }

})


const File = mongoos.model('File', fileSchema)
module.exports = File;