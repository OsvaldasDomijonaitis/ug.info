import { PrismaClient, Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { resolve } from "path";
import bcrypt from "bcrypt";
import { log } from "console";

const prisma = new PrismaClient();

const users = [
  {
    email: "user@example.com",
  },
  {
    email: "admin@example.com",
    role: 2,
  },
  {
    email: "jonas@gmail.com",
  },
];

const events = [
  {
    link: "jonas",
    name: "Jonas Jonaitis",
    description: "Jono Jonaičio puslapis iš duomenų bazės.",
    img: "/images/avatar.png",
  },
  {
    link: "petras",
    name: "Petras Petraitis",
    description: "Petro Petraičio puslapis iš duomenų bazės.",
  },
];

async function main() {
  console.log(`Start seeding ...`);

  console.log(`User seeding ...`);
  const password = await bcrypt.hash("password", 10);

  for (const user of users) {
    const userData = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, password },
    });
    console.log(`Sukurtas vartotojas: ${userData.email}`);
  }

  if ((await prisma.user.count()) < 10) {
    console.log(`Random user seeding ...`);
    for (let i = 0; i < 100; i++) {
      let email = faker.internet.email();
      let status = faker.number.int({ min: 0, max: 1 });
      const userData = await prisma.user.upsert({
        where: { email },
        update: {},
        create: { email, password, status },
      });
      console.log(`Sukurtas vartotojas: ${userData.email}`);
    }
  }

  if ((await prisma.event.count()) < 10) {
  // if ((await prisma.event.count()) < 10) {
    console.log(`Event seeding ...`);
    const users = await prisma.user.findMany();
    for (let i = 0; i < 50; i++) {
      let event = {
        userId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
        name: faker.lorem.words(),
        slug: faker.lorem.slug(),
        date: faker.date.between({
          from: "2025-01-01T00:00:00.000Z",
          to: "2026-01-01T00:00:00.000Z",
        }),
        place: faker.location.city(),
        description: faker.lorem.words({ min: 5, max: 50 }),
        status: faker.number.int({ min: 0, max: 1 }),
      };

      const eventData = await prisma.event.upsert({
        where: { slug: event.slug },
        update: {},
        create: event,
      });

      console.log(`Sukurtas renginys: ${eventData.name}`);
    }
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
