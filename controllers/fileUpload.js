const File = require('../model/File.js')
const cloudinary = require('cloudinary').v2


// exports.localFileUpload = async (req, res) => {
//     try {
//         // fetch the fle 
//         // const file = await  req.files.file;
//         const file = req.files.file;
//         console.log("file-->>", file)

//         // define  server path  wher e  the file will be save
//         let path = __dirname + "/files" + Date.now() + `.${file.name.split('.')[1]}`
//         console.log(`path --> ${path}`)
//         // save move the file 
//         file.mv(path, (err) => {
//             console.log(`fileupload err  -- ${err}`)
//         })
//         res.json({
//             success: true,
//             message: 'local file uploaded successfully ...'
//         })



//     }
//     catch (err) {
//         console.log("not able to upload file ")
//         console.log(err)
//     }
// }

exports.localFileUpload = async (req, res) => {
    try {
        console.log(req.files);  // Log the entire req.files object to see its contents

        const file = await req.files?.file;
        console.log("file-->>", file);
        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded or file key is incorrect'
            });
        }

        // Proceed with handling the file
        let path = __dirname + "/files" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log(`path --> ${path}`);
        file.mv(path, (err) => {
            if (err) {
                console.log(`fileupload err  -- ${err}`);
                return res.status(500).json({ success: false, message: 'Failed to move file' });
            }
            res.json({
                success: true,
                message: 'local file uploaded successfully ...'
            });
        });

    } catch (err) {
        console.log("not able to upload file ");
        console.log(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};




function isFileTypeSupported(type, supportedType) {
    return supportedType.includes(type)
}
async function uploadFileToCloudinary(file, folder) {
    console.log("tempFilePath -- >>", file.tempFilePath);
    const options = { folder };
    options.resource_type = "auto";
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;  // Return the result to capture it in the calling function
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;  // Rethrow the error to be handled by the calling function
    }
}

// image upload 
exports.imageUpload = async (req, res) => {

    try {
        // data fetch 
        const { name, tags, email } = req.body;
        console.log(name, tags, email)

        const file = req.files.imageFile;
        console.log(file)

        // validation 
        const supportedType = ["jpg", "jpeg", "png"]
        const fileType = file.name.split('.')[1].toLowerCase()
        console.log("file type --->", fileType)
        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success: true,
                message: 'File format not supported'
            })
        }
        console.log("uploading file tocloudinary ")

        const response = await uploadFileToCloudinary(file, "myfiles")

        console.log("response-->>>", response)


        // save entry to the db 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'image successfully uploaded  to cloudinary ...'
        })

    }
    catch (err) {
        console.error(err)
        res.status(400).json({
            succes: false,
            message: 'somethng went wrong..'
        })
    }
}





// vedio upload 
exports.uploadVedio = async (req, res) => {
    try {
        const { name, tags, email } = req.body
        console.log(name, tags, email)
        const file = req.files.vedioFile;
        console.log(file)
        // validation 
        const supportedType = ["mp4", "mov"]
        const fileType = file.name.split('.')[1].toLowerCase()
        console.log("file type --->", fileType)
        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success: true,
                message: 'File format not supported'
            })
        }
        const response = await uploadFileToCloudinary(file, "myfiles")

        console.log("response-->>>", response)
        // save entry to the db 
        const fileData = await File.create({
            name,
            tags,
            email,
            vedioUrl: response.secure_url,
        })

        res.json({
            success: true,
            vedioUrl: response.secure_url,
            message: 'vedio successfully uploaded  to cloudinary ...'
        })

    }
    catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            message: 'something went wrong💔💔💔💔'
        })
    }
}