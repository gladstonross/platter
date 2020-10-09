const express = require('express'),
      router = express.Router(),
      Zomato = require("zomato.js");

const z = new Zomato(process.env.API_KEY);
    

router.get('/', async function(req,res) {
    res.render('nearme');
});

router.post( '/', async function(req,res) { 

    let lat = (req.ipInfo.ll) ? req.ipInfo.ll[0] : 28.538336;
    let lon = (req.ipInfo.ll) ? req.ipInfo.ll[1] : -81.379234;
   
    let cordinate = { lat:lat , lon:lon };

    try {
        const code = await z.geocode( cordinate );
        const result = await code;

        let data = {nearby_restaurants: result.nearby_restaurants.map(r => {
            return{
                name: r.restaurant.name,
                type: r.restaurant.cuisines,
                thumb: r.restaurant.thumb,
                votes: r.restaurant.user_rating.votes,
                user_rating: r.restaurant.user_rating.aggregate_rating,
                location: r.restaurant.location.address
            };
        })};

        res.json( {data} );

    }catch (error) {
        console.error(error);
        res.status( 400 ).send('something went wrong');
    }
} );



module.exports = router;