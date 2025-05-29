// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: { name: 'admin', mobile_no: '9633185395', password: '$2b$10$k8nhz7ymk3w4TtLmx64aOuAVTVBCuLvB4YKf8VXLiddLg76RKcure' }
    });
    await prisma.product.createMany({ data: [{ name: 'Kallingal', price: 250, size: '200 ml' }, { name: 'Kallingal', price: 150, size: '100 ml' }] })
}

main()
    .then(() => {
        console.log('Seed successful');
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
