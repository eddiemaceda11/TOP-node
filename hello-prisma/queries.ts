// 1
import { PrismaClient } from './generated/prisma';
import { withAccelerate } from '@prisma/extension-accelerate';

// 2
const prisma = new PrismaClient().$extends(withAccelerate());

// 3
async function main() {
  // Prisma Client queries will be written here
  // await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     email: 'alice@prisma.io',
  //     posts: {
  //       create: { title: 'Hello World' },
  //     },
  //     profile: {
  //       create: { bio: 'I like turtles' },
  //     },
  //   },
  // });

  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  });
  console.log(post);

  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //     profile: true,
  //   },
  // });
  // console.dir(allUsers, { depth: null });
}

// 4
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    // 5
    await prisma.$disconnect();
    process.exit(1);
  });

///////
