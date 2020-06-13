const dotenv = require('dotenv').config();
const api_key = process.env.API_KEY;

const path = require('path');
const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;

app.use( express.static( path.join( __dirname, 'assets' ) ) );

app.listen(port, () => console.log(`the app is runing on port: ${port}`) );

