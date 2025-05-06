import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { JwtAuthGuard } from '../auth/auth-guard/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.enum';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';

// Mock services and guards
const mockEventService = {
  getAllEvents: jest.fn(),
  getEventDetails: jest.fn(),
  bookEvent: jest.fn(),
  getUserBookings: jest.fn(),
  cancelBooking: jest.fn(),
  createEvent: jest.fn(),
  updateEvent: jest.fn(),
  deleteEvent: jest.fn(),
  getAllBookings: jest.fn(),
};

describe('EventController', () => {
  let controller: EventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        { provide: EventService, useValue: mockEventService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<EventController>(EventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all events', async () => {
    await controller.getAllEvents();
    expect(mockEventService.getAllEvents).toHaveBeenCalled();
  });

  it('should get event details', async () => {
    const id = '1';
    await controller.getEventDetails(id);
    expect(mockEventService.getEventDetails).toHaveBeenCalledWith(id);
  });

  it('should book an event', async () => {
    const id = '1';
    const user = { id: 'user1' };
    await controller.bookEvent(id, user);
    expect(mockEventService.bookEvent).toHaveBeenCalledWith(id, user);
  });

  it('should get user bookings', async () => {
    const user = { id: 'user1' };
    await controller.getUserBookings(user);
    expect(mockEventService.getUserBookings).toHaveBeenCalledWith(user);
  });

  it('should cancel a booking', async () => {
    const id = '1';
    const user = { id: 'user1' };
    await controller.cancelBooking(id, user);
    expect(mockEventService.cancelBooking).toHaveBeenCalledWith(id, user);
  });

  it('should create an event', async () => {
    const createEventDTO: CreateEventDTO = {
        name: 'Event 1', date: new Date().toISOString(), location: 'Location 1',
        maxAttendees: 0
    };
    await controller.createEvent(createEventDTO);
    expect(mockEventService.createEvent).toHaveBeenCalledWith(createEventDTO);
  });

  it('should update an event', async () => {
    const id = '1';
    const updateEventDTO: UpdateEventDTO = { name: 'Updated Event', date: new Date().toISOString(), location: 'Updated Location' };
    await controller.updateEvent(id, updateEventDTO);
    expect(mockEventService.updateEvent).toHaveBeenCalledWith(id, updateEventDTO);
  });

  it('should delete an event', async () => {
    const id = '1';
    await controller.deleteEvent(id);
    expect(mockEventService.deleteEvent).toHaveBeenCalledWith(id);
  });

  it('should get all bookings', async () => {
    await controller.getAllBookings();
    expect(mockEventService.getAllBookings).toHaveBeenCalled();
  });
});