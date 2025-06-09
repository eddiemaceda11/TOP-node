import { PrismaClient } from './generated/prisma';
import { withAccelerate } from '@prisma/extension-accelerate';

export const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  // enter queries here
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
