const dotenv = require('dotenv').config();

const express = require('express'), 
      bodyParser = require('body-parser'),
      path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('PORT', PORT);

app.use( express.static( path.join( __dirname, 'assets' ) ) );
app.use( '/modules', express.static(path.join(__dirname, 'node_modules','animate.css')));
app.use( bodyParser.urlencoded({ extended: false }) );

const expressip = require('express-ip');
app.use(expressip().getIpInfoMiddleware);


// ROUTES FOR SITE
app.use( '/', require('./routes/indexRoute') );
app.use( '/search', require('./routes/searchRoute') );
app.use( '/collection', require('./routes/collentionRoute') );
app.use( '/nearme', require('./routes/nearmeRoute') );
app.use('/average', require('./routes/averageRoute'));
app.use('/cuisines', require('./routes/cuisines'));



app.listen(app.get('PORT'), () => console.log(`the app is runing on port: ${app.get('PORT')}`));
