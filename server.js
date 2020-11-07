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
        host : '127.0.01',
        user : 'callum',
        password : 'password',
        database : 'face-rec'
    }
})

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {res.send(database.users)})

app.post("/signin", signin.handleSigninPost(db, bcrypt))

app.post("/register", register.handleRegisterPost(db, bcrypt))

app.get("/profile/:id", profile.handleProfileGet(db))

app.put("/image", image.handleImagePut(db))

app.post("/imageurl", image.handleApiCall())


app.listen(3000, () => {
    console.log(`App is running on port ${3000}`);
});