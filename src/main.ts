import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ConfigService } from '@nestjs/config';

const corsOptions : cors.CorsOptions = {
  origin : 'http://localhost:3001'
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors(corsOptions));

  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>('PORT')|| 3000);
}
bootstrap();
