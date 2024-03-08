const prisma = require("../prisma");
const router = require("express").Router();
module.exports = router;

//return an array of customers GET/api/customer

router.get("/", async (req, res, next) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch {
    next({});
  }
});

/*POST /api/customers/:id/reservations - payload: an object which has a valid restaurant_id, date, and party_count.
returns the created reservation with a status code of 201*/
router.post("/:id/reservations", async (req, res, next) => {
  try {
    const customerId = +req.params.id;
    const { date, partyCount, restaurantId } = req.body;

    // Make sure the request body is converted to the types defined in the schema
    const reservation = await prisma.reservations.create({
      data: {
        date: new Date(date),
        partyCount: +partyCount,
        customerId,
        restaurantId: +restaurantId,
      },
    });

    res.json(reservation);
  } catch (e) {
    next(e);
  }
});

/*DELETE /api/customers/:customer_id/reservations/:id - the id of the reservation to delete and the customer_id is passed in the URL, returns nothing with a status code of 204*/

router.delete("/:customer_id/reservations/:id", async (req, res, next) => {
  try {
    // Note: we don't actually need to use the customer id,
    // since the reservation id is unique and can be used to delete the reservation
    const id = +req.params.reservationsId;
    await prisma.reservations.delete({ where: { id } });

    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});
