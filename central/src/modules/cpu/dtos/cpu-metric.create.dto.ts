import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class CpuMetricCreateDto {

    @ApiProperty({
        example: 'agent-test-00000',
        required: true,
    })    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    readonly node: string;

    @ApiProperty({
        example: 'linux',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    readonly platform: string;

    @ApiProperty({
        example: 0.0077,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    readonly usage: number;
    
    @ApiProperty({
        example: 0.77,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    readonly usagePercentage: number;
    
    @ApiProperty({
        example: 0,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    readonly averageCpuSpeed: number;
    
    @ApiProperty({
        example: 0,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    readonly minCpuSpeed: number;
    
    @ApiProperty({
        example: 0,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    readonly maxCpuSpeed: number;
    
    @ApiProperty({
        example: 277057536,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    readonly freeMemory: number;
    
    @ApiProperty({
        example: 3.36,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    readonly freeMemoryPercentage: number;
    
    @ApiProperty({
        example: 8241651712,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    readonly totalMemory: number;
    
    @ApiProperty({
        example: "2024-04-19T13:41:29.965+00:00",
        required: true,
    })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    readonly date: Date;

    @ApiProperty({
        example: 1713534089965,
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    readonly timestamp: number;

}
