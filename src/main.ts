import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './helpers/error/all-exceptions.filter';
import { EnvService } from './modules/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config for environment variable
  const configService = app.get(EnvService);

  // Config for custom global exception
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  // Config for CORS
  app.enableCors({
    origin: configService.get('APP_CORS').split(','),
    credentials: true,
  });

  // Config for custom port
  const port = configService.get('PORT');

  await app.listen(port);
}
bootstrap();
