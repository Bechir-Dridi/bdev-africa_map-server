const express = require("express")
const router = express.Router()
const { getCountries, getCountry, createCountry } = require("../controllers/countryController.js")
const { upload } = require("../multer.js")

//GET all countries: 
router.get("/", getCountries)

//GET a single country: 
router.get("/:id", getCountry)

//POST new country: 
router.post("/", upload.single('img'), createCountry)

module.exports = router