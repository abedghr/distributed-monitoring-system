import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { Reflector } from '@nestjs/core';
import {
    ClassConstructor,
    plainToInstance,
} from 'class-transformer';
import {
    ResponseDefaultSerialization,
} from 'src/common/response/serializations/response.default.serialization';
import {
    RESPONSE_MESSAGE_PATH_META_KEY,
    RESPONSE_SERIALIZATION_META_KEY,
} from 'src/common/response/constants/response.constant';
import { IResponse } from 'src/common/response/interfaces/response.interface';

@Injectable()
export class ResponseDefaultInterceptor<T>
    implements NestInterceptor<Promise<T>>
{
    constructor(
        private readonly reflector: Reflector,
    ) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Promise<Observable<Promise<ResponseDefaultSerialization>>> {
        if (context.getType() === 'http') {
            return next.handle().pipe(
                map(async (res: Promise<Record<string, any>>) => {
                    const ctx: HttpArgumentsHost = context.switchToHttp();
                    const response: Response = ctx.getResponse();

                    let message: string = this.reflector.get<string>(
                        RESPONSE_MESSAGE_PATH_META_KEY,
                        context.getHandler()
                    );
                    const classSerialization: ClassConstructor<any> =
                        this.reflector.get<ClassConstructor<any>>(
                            RESPONSE_SERIALIZATION_META_KEY,
                            context.getHandler()
                        );
            
                    // set default response
                    let statusCode: number = response.statusCode;
                    let data: Record<string, any> = undefined;

                    // response
                    const responseData = (await res) as IResponse;

                    if (responseData) {
                        data = responseData.data;

                        if (classSerialization) {
                          data = plainToInstance(classSerialization, data, {
                            ...{ excludeExtraneousValues: true },
                          });
                        }
                    }

                    return {
                        statusCode,
                        message,
                        data,
                    };
                })
            );
        }

        return next.handle();
    }
}
