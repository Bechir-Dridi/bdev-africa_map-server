const multer = require('multer');
const { cloudinary } = require("./cloudinary.js")
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//------------------------------- countries_storage --------------------------------
//Create Cloudinary storage engine for direct uploads:
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'countries_storage',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

//Create a Multer instance with the storage options:
const upload = multer({ storage: storage });

//------------------------------- images_storage --------------------------------
//Create Cloudinary storage engine for direct uploads:
const imagesStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'images_storage',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

//Create a Multer instance with the storage options:
const imagesUpload = multer({ storage: imagesStorage });



module.exports = { upload, imagesUpload }