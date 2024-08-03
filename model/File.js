const mongoos = require('mongoose')
const nodemailer = require("nodemailer");


require("dotenv").config()
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

// post middleware 

fileSchema.post("save", async function (doc) {
    try {
        console.log("doc->>", doc)
        
        // transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
              user: process.env.MAIL_USER,
              pass:process.env.MAIL_PASS,
            },
          });
       // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"from priti 👻"', // sender address
    to: doc.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello welcome?", // plain text body
    html: `<body><b>file uploaded here..💓 <br/></b> <img src='${doc.imageUrl}'/> </body>`, // html body

  });

  console.log("Message sent:", info);
  console.log("Message sent: %s", info.messageId);
    }
    catch (err) {
        console.log(err)

    }
})


const File = mongoos.model('File', fileSchema)
module.exports = File;