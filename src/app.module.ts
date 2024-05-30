import { Module } from '@nestjs/common';

import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { EnvModule } from './modules/env/env.module';
import { EnvSchema } from './modules/env/env.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => EnvSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    PrismaModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
