// const { PrismaClient } = require('./generated/prisma');
// const { withAccelerate } = require('@prisma/extension-accelerate');

// export const prisma = new PrismaClient().$extends(withAccelerate());
const prisma = require('./index.js');

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
