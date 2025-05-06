import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { JwtAuthGuard } from './auth/auth-guard/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_URL,
      entities:[User],
      synchronize:true
    }),
    UserModule,
    AuthModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
  exports:[AppService]
})
export class AppModule {}
