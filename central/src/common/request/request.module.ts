import {
    HttpStatus,
    Module,
    UnprocessableEntityException,
    ValidationError,
    ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useFactory: () =>
                new ValidationPipe({
                    transform: true,
                    skipNullProperties: false,
                    skipUndefinedProperties: false,
                    skipMissingProperties: false,
                    forbidUnknownValues: false,
                    errorHttpStatusCode: HttpStatus.BAD_REQUEST,
                    exceptionFactory: async (errors: ValidationError[]) =>
                        new UnprocessableEntityException({
                            statusCode: HttpStatus.BAD_REQUEST,
                            message: 'request.validation',
                            errors,
                        }),
                }),
        },
    ],
    imports: [],
})
export class RequestModule {}
