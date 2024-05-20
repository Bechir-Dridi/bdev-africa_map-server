const express = require("express")
const router = express.Router()
const { getImages, createImage } = require("../controllers/imageController.js")
const { upload, imagesUpload } = require("../multer.js")

//GET all images: 
router.get("/:c_name", getImages)

//POST new image: 
router.post("/", imagesUpload.single('img'), createImage)

module.exports = router