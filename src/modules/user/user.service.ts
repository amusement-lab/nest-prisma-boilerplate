import { Injectable } from '@nestjs/common';

import { PrismaService } from '~~/modules/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return await this.prisma.user.findMany({ include: { role: true } });
  }

  async create(username: string, password: string, roleId: string) {
    return await this.prisma.user.upsert({
      where: { username },
      create: { username, password, roleId },
      update: {},
    });
  }
}
