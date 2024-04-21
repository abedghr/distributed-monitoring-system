import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsOptional,
    IsString,
    Validate,
    ValidateIf,
} from 'class-validator';
import { DateTimeToGreaterThanFromValidator } from 'src/common/request/validations/request.datetime.validation';

export class CpuMetricGetDto {

    @ApiProperty({
        example: '2024-04-19 12:10:00',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Type(() => String)
    readonly dateTimeFrom: string;

    @ApiProperty({
        example: '2024-04-19 23:40:00',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Validate(DateTimeToGreaterThanFromValidator)
    @ValidateIf((obj) => obj.dateTimeTo !== undefined)
    @Type(() => String)
    readonly dateTimeTo: string;

    @ApiProperty({
        example: 'agent-test-00000',
        required: false,
    })    
    @IsOptional()
    @IsString()
    @Type(() => String)
    readonly node: string;
}
