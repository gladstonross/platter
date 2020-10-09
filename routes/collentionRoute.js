const express = require('express'),
    router = express.Router(),
    Zomato = require("zomato.js");

const z = new Zomato(process.env.API_KEY);


router.get('/' ,async function(req,res) {
    // orlando ll  lat: 28.538336 ,lon: -81.379234
    let lat = (req.ipInfo.ll) ? req.ipInfo.ll[0] :  28.538336;
    let lon = (req.ipInfo.ll) ? req.ipInfo.ll[1] : -81.379234;

    let result;

   try {
       const collections = await z.collections({ lat: lat ,lon: lon });
       const collectedData = await collections;
        result = collectedData.map( collection => {
            return {
                title: collection.title,
                description: collection.description,
                resCount: collection.res_count,
                image: collection.image_url,
                url: collection.url
            };
        });

   } catch (err) {
       console.error(err);
       res.status(400).send('somethig went wrong');
   }

   res.render('collection',{ content: result });
});


module.exports = router;