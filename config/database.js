const mongoos = require("mongoose")

require("dotenv").config()

exports.connect = () => {
    mongoos.connect(process.env.MONGO_URL).then(() => {
        console.log("database connected successfully ..💚💚💚💚")
    }).catch((err) => {
        console.log(`database connection error --> ${err}`)
        process.exit(1)
    })
}


