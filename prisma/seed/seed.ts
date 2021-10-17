import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient();

async function seeder(): Promise<void> {
  let levels = [
    { name: 'ND1' },
    { name: 'ND2' },
    { name: 'HND1' },
    { name: 'HND2' },
  ];

  try {
    await prisma.level.createMany({ data: levels });
  } catch (error) {
    console.log('Seeding Failed: ', error);
  }
}
seeder().then(() => console.log('seeded'));
