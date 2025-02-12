import { PrismaClient, Prisma } from '@prisma/client';
import { resolve } from 'path';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)

  const password = await bcrypt.hash('password', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password,
    },
  });
  console.log(`Sukurtas vartotojas: ${user1.email}`);
  
  const user_admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password,
      role: 2
    },
  });
  console.log(`Sukurtas vartotojas: ${user_admin.email}`);
  

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })