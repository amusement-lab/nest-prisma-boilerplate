import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(password: string, username: string) {
    const data = await this.prisma.user.findUnique({
      where: { username },
    });

    if (data && data.password === password) {
      return { token: jwt.sign({ id: data.id }, 'privatekey') };
    } else {
      throw new HttpException(
        'Wrong password or username',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
