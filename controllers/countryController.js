//Import connection:
const { conn } = require("../db.js");


//------------- get all countries -------------
const getCountries = (req, res) => {
    //write query for all countries
    const sql = "SELECT * FROM countries_main";//SELECT: get, *:all, countries_main: Table name

    //make query & get result
    conn.query(sql, (err, countries) => {
        if (err) {
            console.log("get all error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // results contains rows returned by server:
        //MySQL: 
        //console.log("get all:", countries);
        res.status(200).json({ countries })

        //Postgres-Supabse:
        //console.log("get all:", countries.rows);
        //res.status(200).json({ countries: countries.rows })
    });

}

//------------- get a single country  -------------
const getCountry = (req, res) => {
    // Extract the country ID from the request parameters:
    //const countryId = req.params.id;
    const { id } = req.params

    //write query for a country:
    //MySQL:
    const sql = `SELECT * FROM countries_main WHERE id = ?`;
    //Postgres:
    //const sql = `SELECT * FROM countries_main WHERE id = $1`;


    //make query & get result:
    conn.query(sql, [id], (error, country) => {
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Check if the country was found:
        //MySQL:
        if (country.length === 0) {
            return res.status(404).json({ error: "Country not found" });
        }
        //Postgres:
        //if (country.rows.length === 0) {
        //    return res.status(404).json({ error: "Country not found" });
        //}

        // Result contains the country with the specified ID:
        //MySQL:
        //console.log("get by ID:", country[0]);
        res.status(200).json({ country: country[0] });
        //Postgres:
        //console.log("get by ID:", country.rows[0]);
        //res.status(200).json({ country: country.rows[0] });
    });
}


//------------- create new country ------------- 
const createCountry = (req, res) => {
    // Extract the file and other details from the request
    const file = req.file;
    console.log("req.file: ", req.file);

    // Check if a file is provided
    if (!file) {
        return res.status(400).json({ error: "No file provided" });
    }

    // Extract name from the file name
    const name = file.originalname.split("_")[0];
    console.log("name: ", name);

    // The file.path contains the Cloudinary URL due to multer and CloudinaryStorage
    const flag_img_url = file.path;

    // Query to insert new country
    const sql = "INSERT INTO countries_main (name, flag_img) VALUES (?, ?)";

    // Insert country into the database
    conn.query(sql, [name, flag_img_url], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        //-------------------Get the added country
        // Get id of inserted country
        const countryId = results.insertId;

        // Query to get newly inserted country by id
        const sql2 = "SELECT * FROM countries_main WHERE id = ?";

        // Fetch the inserted country from the database
        conn.query(sql2, [countryId], (error, country) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }

            // Respond with success message and the created country
            res.status(200).json({ message: "Country created", country: country[0] });
        });
    });
};



//delete a country

//update a country

module.exports = {
    getCountries,
    getCountry,
    createCountry
}