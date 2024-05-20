//Import connection:
const { conn } = require("../db.js");


//------------- get all images -------------
const getImages = (req, res) => {
    // Extract the country c-name from the request parameters:
    //const countryName = req.params.c_name;
    const { c_name } = req.params

    //write query for all countries
    //Mysql:
    const sql = "SELECT * FROM images WHERE country_name = ?";//SELECT: get, *:all, countries_main: Table name
    //Postgres:
    //const sql = "SELECT * FROM images WHERE country_name = $1"

    //make query & get result
    conn.query(sql, [c_name], (err, images) => {
        if (err) {
            console.log("get all error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // results contains rows returned by server:
        //MySQL:
        //console.log("get all:", images);
        res.status(200).json({ images })
        //Postgres:
        //console.log("get all:", images);
        //res.status(200).json({ images: images.rows })
    });

}


//------------- create new image ------------- 
const createImage = (req, res) => {
    // Extract the file and other details from the request
    const file = req.file;
    console.log("req.file: ", req.file);

    // Check if a file is provided
    if (!file) {
        return res.status(400).json({ error: "No file provided" });
    }

    // Extract name from the file name
    const countryName = file.originalname.split("_")[0];
    const imageName = file.originalname.split("_").slice(1).join('_');
    console.log("countryName : ", countryName);
    console.log("imageName : ", imageName);

    // The file.path contains the Cloudinary URL due to multer and CloudinaryStorage
    const img_url = file.path;

    // Query to insert new country
    const sql = "INSERT INTO images (country_name, img_name, img_url) VALUES (?, ?, ?)";

    // Insert country into the database
    conn.query(sql, [countryName, imageName, img_url], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        //-------------------Get the added image
        // Get id of inserted image
        const imgId = results.insertId;

        // Query to get newly inserted country by id
        const sql2 = "SELECT * FROM images WHERE id = ?";

        // Fetch the inserted country from the database
        conn.query(sql2, [imgId], (error, image) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }

            // Respond with success message and the created country
            res.status(200).json({ message: "Image created", img: image[0] });
        });
    });
};



//delete an image

//update an image

module.exports = {
    getImages,
    createImage
}