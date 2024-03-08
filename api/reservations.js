const prisma = require("../prisma");
const router = require("express").Router();
module.exports = router;

//return an array of reservations GET/api/reservations

router.get("/", async (req, res, next) => {
  try {
    const reservations = await prisma.reservations.findMany();
    res.json(reservations);
  } catch {
    next({});
  }
});
