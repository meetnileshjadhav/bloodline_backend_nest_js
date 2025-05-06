import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

// const corsOptions : cors.CorsOptions = {
//   origin : 'http://localhost:3001'
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // app.use(cors(corsOptions));

  const configService = app.get(ConfigService);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('AI Exam 5 May API')
    .setDescription('API documentation for the AI Exam 5 May project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
