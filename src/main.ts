import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './helpers/error/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config for custom global exception
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  await app.listen(3000);
}
bootstrap();
