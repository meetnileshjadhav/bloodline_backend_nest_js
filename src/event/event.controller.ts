import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/auth-guard/jwt-auth.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { RolesGuard } from '../auth/roles/role.guard';

// event.controller.ts - Handles event-related requests

@ApiTags('Events')
@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {}

    // @desc     Get all events
    // @route    GET /events
    // @access   Public
    @Get()
    async getAllEvents() {
        try {
            return this.eventService.getAllEvents();
        } catch (error) {
            throw new HttpException('Failed to fetch events', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @desc     Get event details by ID
    // @route    GET /events/:id
    // @access   Public
    @Get(':id')
    async getEventDetails(@Param('id') id: string) {
        return this.eventService.getEventDetails(id);
    }

    // @desc     Book an event
    // @route    POST /events/book/:id
    // @access   Authenticated User
    @UseGuards(JwtAuthGuard)
    @Post('book/:id')
    async bookEvent(@Param('id') id: string, @Body() user: any) {
        return this.eventService.bookEvent(id, user);
    }

    // @desc     Get user bookings
    // @route    GET /events/bookings
    // @access   Authenticated User
    @UseGuards(JwtAuthGuard)
    @Get('bookings')
    async getUserBookings(@Body() user: any) {
        return this.eventService.getUserBookings(user);
    }

    // @desc     Cancel a booking
    // @route    DELETE /events/bookings/:id
    // @access   Authenticated User
    @UseGuards(JwtAuthGuard)
    @Delete('bookings/:id')
    async cancelBooking(@Param('id') id: string, @Body() user: any) {
        return this.eventService.cancelBooking(id, user);
    }

    // @desc     Create a new event
    // @route    POST /events
    // @access   Admin
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post()
    async createEvent(@Body() createEventDTO: CreateEventDTO) {
        try {
            return this.eventService.createEvent(createEventDTO);
        } catch (error) {
            throw new HttpException('Failed to create event', HttpStatus.BAD_REQUEST);
        }
    }

    // @desc     Update an event
    // @route    PUT /events/:id
    // @access   Admin
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Admin)
    @Put(':id')
    async updateEvent(@Param('id') id: string, @Body() updateEventDTO: UpdateEventDTO) {
        return this.eventService.updateEvent(id, updateEventDTO);
    }

    // @desc     Delete an event
    // @route    DELETE /events/:id
    // @access   Admin
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Admin)
    @Delete(':id')
    async deleteEvent(@Param('id') id: string) {
        return this.eventService.deleteEvent(id);
    }

    // @desc     Get all bookings
    // @route    GET /events/bookings/all
    // @access   Admin
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(Role.Admin)
    @Get('bookings/all')
    async getAllBookings() {
        return this.eventService.getAllBookings();
    }
}