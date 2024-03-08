const prisma = require("../prisma");
const router = require("express").Router();
module.exports = router;

//return an array of restaurants GET/api/restaurant

router.get("/", async (req, res, next) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch {
    next({});
  }
});
