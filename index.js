const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

var port = process.env.port || 8000;

const db = mysql.createConnection({
    user: 'be9c40441b7ff9',
    host: 'us-cdbr-east-06.cleardb.net',
    password: '7c514e95',
    database: 'heroku_ae9ea8953cb0718',
});
// mysql://be9c40441b7ff9:7c514e95@us-cdbr-east-06.cleardb.net/heroku_ae9ea8953cb0718?reconnect=true

app.post('/submit', (req, res) => {
    const Latitude = req.body.Latitude;
    const Longitude = req.body.Longitude;
    const name = req.body.name;
    const NearestLandmark = req.body.NearestLandmark;

    db.query('INSERT INTO latlongstorage_fyp (Latitude, Longitude, name, NearestLandmark) VALUES (?,?,?,?)',
        [Latitude, Longitude, name, NearestLandmark], (err, result) => {
            if (err){
                console.log(err)
            }
            else {
                res.send("Values inserted")
            }
    });
})

app.listen(port, () => {
    console.log(`Server running on port` + port);
});