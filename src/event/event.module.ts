import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Event } from './entity/event.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Event]), HttpModule],
    controllers: [EventController],
    providers: [EventService],
})
export class EventModule {}