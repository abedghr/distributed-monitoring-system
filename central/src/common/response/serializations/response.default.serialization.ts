import { ApiProperty } from '@nestjs/swagger';

export class ResponseDefaultSerialization<T = Record<string, any>> {
    @ApiProperty({
        name: 'statusCode',
        type: Number,
        nullable: false,
        description: 'return specific status code for every endpoints',
        example: 200,
    })
    statusCode: number;

    @ApiProperty({
        name: 'message',
        nullable: false,
        description: 'Message',
    })
    message: string;

    data?: T;
}
