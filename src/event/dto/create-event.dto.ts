import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDTO {
    @ApiProperty({ example: 'Tech Conference 2025', description: 'The name of the event' })
    name: string;

    @ApiProperty({ example: '2025-06-15', description: 'The date of the event' })
    date: string;

    @ApiProperty({ example: 'New York City', description: 'The location of the event' })
    location: string;

    @ApiProperty({ example: 100, description: 'The maximum number of attendees' })
    maxAttendees: number;
}