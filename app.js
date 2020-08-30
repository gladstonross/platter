const dotenv = require('dotenv').config();

const express = require('express'), 
      Zomato = require('zomato.js'),
      bodyParser = require('body-parser'),
      path = require('path'),
      ejs = require('ejs');

const z = new Zomato(process.env.API_KEY);
const app = express();
const port = 3000 || process.env.PORT;

app.set('view engine', 'ejs');

app.use( express.static( path.join( __dirname, 'assets' ) ) );
app.use( '/modules', express.static(path.join(__dirname, 'node_modules','animate.css')));

app.use( bodyParser.urlencoded({ extended: false }) );


app.get('/', function(req,res) {

  
    const reviews = async function() {
       let reviewsData;
        try {
            const rev = await z.reviews({ res_id: 40848 });
            const data = await rev;
            reviewsData = data;
        }catch(error) {
            console.error(error);
        }
        
        const restaurantReviews = reviewsData.user_reviews.map(r => {
            return {
                text: r.review_text,
                user: r.user,
                rating_text: r.rating_text,
            };
        });
        console.log(restaurantReviews);
        res.render('index', { content:restaurantReviews} );
    };
    
    Promise.resolve( reviews() );
   
    
});


app.get('/search', function(req, res) {
    res.render('search');
});


app.post('/search', async function(req, res) {
    
    try {
        
        const q = req.body.q;
        const c = req.body.city;

        const city = await z.cities({ q:c });
        const num = await city;
        let ID = (num.length == 0) ? null : num[0].id;

        const dynamic = { entity_id: ID, entity_type: 'city', q };

        const data = await z.search(dynamic);

        const restaurants = data.restaurants.map( r => {
            return {
                name: r.name,
                url: r.url,
                thumbnail: r.thumb,
                location: {
                    address: r.location.address,
                    city: r.location.city
                },
                user_rating: r.user_rating.aggregate_rating
            };
        });

        res.json( { restaurants } );
        
    }catch(error) {
        console.error(error);
        res.status(500).send('something went wrong');
    }

});


app.listen(port, () => console.log(`the app is runing on port: ${port}`));
