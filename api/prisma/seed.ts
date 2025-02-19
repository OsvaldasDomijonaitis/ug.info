import { PrismaClient, Prisma } from "@prisma/client";
import { resolve } from "path";
import bcrypt from "bcrypt";

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
    email: "jonas@gmail.com"
  }
];

// const clients = [
//   {
//     link: "jonas",
//     name: "Jonas Jonaitis",
//     description: "Jono Jonaičio puslapis iš duomenų bazės.",
//     img: "/images/avatar.png",
//   },
//   {
//     link: "petras",
//     name: "Petras Petraitis",
//     description: "Petro Petraičio puslapis iš duomenų bazės.",
//   },
// ];

async function main() {
  console.log(`Start seeding ...`);
  
  console.log(`User seeding ...`);
  const password = await bcrypt.hash("password", 10);
  
  for (const user of users) {
    const userData = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {...user, password},
    });
    console.log(`Sukurtas vartotojas: ${userData.email}`);
  }
  
  // console.log(`Client seeding ...`);
  // for (const client of clients) {
  //   const clientData = await prisma.client.upsert({
  //     where: { link: client.link },
  //     update: {},
  //     create: client,
  //   });
  //   console.log(`Sukurtas klientas: ${clientData.link}`);
  // }

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
