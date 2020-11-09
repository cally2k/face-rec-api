const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');


const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex ({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
})

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {res.send('Working')})

app.post("/signin", signin.handleSigninPost(db, bcrypt))

app.post("/register", register.handleRegisterPost(db, bcrypt))

app.get("/profile/:id", profile.handleProfileGet(db))

app.put("/image", image.handleImagePut(db))

app.post("/imageurl", image.handleApiCall())


app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`);
});