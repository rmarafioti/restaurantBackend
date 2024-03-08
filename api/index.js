const router = require("express").Router();
module.exports = router;

router.use("/customer", require("./customer"));
router.use("/restaurant", require("./restaurant"));
router.use("/reservations", require("./reservations"));
