const prisma = require("../prisma");
const seed = async () => {
  // create 10 customers
  for (let i = 1; i <= 10; i++) {
    await prisma.customer.upsert({
      where: { id: i },
      update: {},
      create: {
        name: `Customer ${i}`,
      },
    });
  }

  // create 10 restaurants
  for (let i = 1; i <= 10; i++) {
    await prisma.restaurant.upsert({
      where: { id: i },
      update: {},
      create: {
        name: `Restaurant ${i}`,
      },
    });
  }

  // create 10 reservations
  for (let i = 1; i <= 10; i++) {
    await prisma.reservations.upsert({
      where: { id: i },
      update: {},
      create: {
        partyCount: i,
        customerId: i,
        restaurantId: i,
      },
    });
  }
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
