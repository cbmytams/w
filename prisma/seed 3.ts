import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEFAULT_CATEGORIES = [
  'Beauty',
  'Lifestyle',
  'Gaming',
  'Finance',
  'Music',
  'Sport',
  'Tech',
  'Food',
  'Travel'
];

const DEFAULT_TAGS = [
  'Premium',
  'UGC',
  'B2B',
  'Short-form',
  'Long-form'
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'wafia' },
    update: {},
    create: {
      name: 'Wafia',
      slug: 'wafia'
    }
  });

  await prisma.category.createMany({
    data: DEFAULT_CATEGORIES.map((name) => ({
      tenantId: tenant.id,
      name,
      slug: slugify(name)
    })),
    skipDuplicates: true
  });

  await prisma.tag.createMany({
    data: DEFAULT_TAGS.map((name) => ({
      tenantId: tenant.id,
      name,
      slug: slugify(name)
    })),
    skipDuplicates: true
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
