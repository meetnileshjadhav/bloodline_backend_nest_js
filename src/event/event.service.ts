import { Injectable } from '@nestjs/common';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entity/event.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>,
        private readonly httpService: HttpService,
    ) {}

    async getAllEvents() {
        return this.eventRepository.find();
    }

    async getEventDetails(id: string) {
        return this.eventRepository.findOne({ where: { id: parseInt(id, 10) } });
    }

    async bookEvent(id: string, user: any) {
        const event = await this.eventRepository.findOne({ where: { id: parseInt(id, 10) } });
        if (!event) {
            throw new Error('Event not found');
        }
        if (event.currentAttendees >= event.maxAttendees) {
            throw new Error('Event is fully booked');
        }
        event.currentAttendees += 1;
        await this.eventRepository.save(event);
        return { message: 'Event booked successfully' };
    }

    async getUserBookings(user: any) {
        // Placeholder for fetching user-specific bookings
        return { message: 'User bookings fetched successfully' };
    }

    async cancelBooking(id: string, user: any) {
        const event = await this.eventRepository.findOne({ where: { id: parseInt(id, 10) } });
        if (!event) {
            throw new Error('Event not found');
        }
        if (event.currentAttendees > 0) {
            event.currentAttendees -= 1;
            await this.eventRepository.save(event);
        }
        return { message: 'Booking cancelled successfully' };
    }

    async createEvent(createEventDTO: CreateEventDTO) {
        const event = this.eventRepository.create(createEventDTO);
        return this.eventRepository.save(event);
    }

    async updateEvent(id: string, updateEventDTO: UpdateEventDTO) {
        await this.eventRepository.update(id, updateEventDTO);
        return this.eventRepository.findOne({ where: { id: parseInt(id, 10) } });
    }

    async deleteEvent(id: string) {
        const result = await this.eventRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Event not found');
        }
        return { message: 'Event deleted successfully' };
    }

    async getAllBookings() {
        // Placeholder for fetching all bookings for admin
        return { message: 'All bookings fetched successfully' };
    }

    async getEventLocation(address: string): Promise<any> {
        const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

        try {
            const response = await firstValueFrom(this.httpService.get<any>(url));
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch location data');
        }
    }
}