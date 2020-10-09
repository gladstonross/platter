let express = require('express'),
    router = express.Router(),
    Zomato = require("zomato.js");

const z = new Zomato(process.env.API_KEY);

router.get('/', async (req,res)=> {
    let lat = (req.ipInfo.ll) ? req.ipInfo.ll[0] : 28.538336;
    let lon = (req.ipInfo.ll) ? req.ipInfo.ll[1] : -81.379234;
   
    let cordinate = { lat:lat , lon:lon };
    let cuisines;

    try {
        const code = await z.cuisines( cordinate );
        const result = await code;
        
        let cuisine = result.map((c)=>{
            return { cuisine: c.cuisine_name};
        });
        cuisines = cuisine;
    }catch (error) {
        console.error(error);
        res.status( 400 ).send('something went wrong');
    }

    res.render('cuisines', {content:cuisines});
});


module.exports = router;