import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const corsOptions : cors.CorsOptions = {
  origin : 'http://localhost:3001'
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors(corsOptions));

  const configService = app.get(ConfigService);

  // Swagger setup
  const config = new DocumentBuilder()
  .setTitle('AI Exam 5 May API')
  .setDescription('API documentation for the AI Exam 5 May project')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
