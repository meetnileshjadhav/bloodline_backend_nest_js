import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDTO {
    @ApiProperty({ example: 'Tech Conference 2025', description: 'The updated name of the event', required: false })
    name?: string;

    @ApiProperty({ example: '2025-06-15', description: 'The updated date of the event', required: false })
    date?: string;

    @ApiProperty({ example: 'New York City', description: 'The updated location of the event', required: false })
    location?: string;

    @ApiProperty({ example: 100, description: 'The updated maximum number of attendees', required: false })
    maxAttendees?: number;
}