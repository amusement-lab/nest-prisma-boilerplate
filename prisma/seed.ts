import { PrismaClient } from '@prisma/client';

import { ModulePermissions } from '../src/modules/auth/permission.entity';

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    create: { name: 'admin', modulePermissions: [ModulePermissions.ALL] },
    update: { name: 'admin', modulePermissions: [ModulePermissions.ALL] },
  });

  const studentRole = await prisma.role.upsert({
    where: { name: 'student' },
    create: {
      name: 'student',
      modulePermissions: [ModulePermissions.STUDENT_MODULE],
    },
    update: {
      name: 'student',
      modulePermissions: [ModulePermissions.STUDENT_MODULE],
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    create: {
      username: 'admin',
      password: '123456',
      roleId: adminRole.id,
    },
    update: {
      username: 'admin',
      password: '123456',
      roleId: adminRole.id,
    },
  });

  const studentUser = await prisma.user.upsert({
    where: { username: 'student' },
    create: {
      username: 'student',
      password: '123456',
      roleId: studentRole.id,
    },
    update: {
      username: 'student',
      password: '123456',
      roleId: studentRole.id,
    },
  });

  console.log({
    message: 'Seed has been planted',
    data: { role: [adminRole, studentRole], user: [adminUser, studentUser] },
  });
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
