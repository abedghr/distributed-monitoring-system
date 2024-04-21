import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IHelperDateTimeService } from '../interfaces/helper.datetime-service.interface';
import { IHelperIntervalsResponse } from '../interfaces/helper.interface';

@Injectable()
export class HelperDateTimeService implements IHelperDateTimeService {
    private readonly defTz: string;

    constructor(private readonly configService: ConfigService) {
        this.defTz = this.configService.get<string>('app.tz');
    }

    calculateIntervals(dateTimeFrom: string, dateTimeTo: string): IHelperIntervalsResponse<any> {
        // Convert date strings to Date objects
        const timestampFrom: number = new Date(dateTimeFrom).getTime();
        const timestampTo: number = new Date(dateTimeTo).getTime();
console.log(dateTimeFrom, dateTimeTo, timestampFrom, timestampTo);

        // Calculate the difference between from and to
        const timeDifference = timestampTo - timestampFrom;

        let groupingIntervalEquation: number;
        if (timeDifference <= 1000 * 60 * 60 * 24) { // Less than or equal to 1 day (24 hours)
        groupingIntervalEquation = 1000 * 60;
        } else if (timeDifference <= 1000 * 60 * 60 * 24 * 30) { // Less than or equal to 30 days (1 month)
        groupingIntervalEquation = 1000 * 60 * 60;
        } else { // More than 30 days (1 month)
        groupingIntervalEquation = 1000 * 60 * 60 * 24;
        }
        return {timestampFrom, timestampTo, groupingIntervalEquation}
    }

}
