import { Module } from '@nestjs/common';

import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
})
export class AppModule {}
