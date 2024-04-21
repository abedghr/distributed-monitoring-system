import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'dateTimeToGreaterThanFrom', async: false })
export class DateTimeToGreaterThanFromValidator implements ValidatorConstraintInterface {
    validate(dateTimeTo: string, args: ValidationArguments) {
        let dateTimeFrom = args.object['dateTimeFrom'];
        const now = new Date();
        
        if (!dateTimeFrom) {
            dateTimeFrom = `${now.toISOString().slice(0, 10)} 00:00:00`; // Set dateTimeFrom to the current date
        }

        if (!dateTimeTo) {
            dateTimeTo = `${now.toISOString().slice(0, 10)} 23:59:59`; // Set dateTimeTo to the end of the current date
        }

        return new Date(dateTimeTo) >= new Date(dateTimeFrom);
    }

    defaultMessage(args: ValidationArguments) {
        return 'dateTimeTo must be greater than dateTimeFrom';
    }
}