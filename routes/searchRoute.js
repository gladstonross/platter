const express = require("express"),
  router = express.Router(),
  Zomato = require("zomato.js");

const z = new Zomato(process.env.API_KEY);

router.get("/", async function (req, res) {
  res.render( "search", {content:req.ipInfo.city} );
});

router.post("/", async function (req, res) {
  try {
    const q = req.body.q,
      c = req.body.city;

    const city = await z.cities({ q: c });
    const num = await city;

    let ID = num.length == 0 ? null : num[0].id;
    const dynamic = { entity_id: ID, entity_type: "city", q };

    const data = await z.search(dynamic);

    const restaurants = data.restaurants.map((r) => {
      return {
        name: r.name,
        url: r.url,
        type: r.cuisines,
        thumbnail: r.thumb,
        location: {
          address: r.location.address,
          city: r.location.city,
        },
        user_rating: r.user_rating.aggregate_rating,
      };
    });

    res.json({ restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong");
  }
});

module.exports = router;
