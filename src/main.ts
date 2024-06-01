import '@wahyubucil/nestjs-zod-openapi/boot';

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
  type SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { patchNestjsSwagger } from '@wahyubucil/nestjs-zod-openapi';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './helpers/error/all-exceptions.filter';
import { EnvService } from './modules/env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config for environment variable
  const configService = app.get(EnvService);

  // Config for zod and openapi
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJs API')
    .setDescription('API documentation for SIMKEU application')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'token',
    )
    .addServer(String(configService.get('APP_OPEN_API_HOST')))
    .addSecurityRequirements('token')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  patchNestjsSwagger({ schemasSort: 'alpha' });

  const document = SwaggerModule.createDocument(app, swaggerConfig, options);
  SwaggerModule.setup('api-docs', app, document);

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
