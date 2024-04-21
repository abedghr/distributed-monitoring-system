import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
    ApiConsumes,
    ApiExtraModels,
    ApiParam,
    ApiProduces,
    ApiQuery,
    ApiResponse,
    getSchemaPath,
} from '@nestjs/swagger';
import {
    IDocDefaultOptions,
    IDocOfOptions,
    IDocOptions,
} from 'src/common/doc/interfaces/doc.interface';
import { ResponseDefaultSerialization } from 'src/common/response/serializations/response.default.serialization';

export function Doc<T>(
    message: string,
    options?: IDocOptions<T>
): MethodDecorator {
    
    const docs = [];
    const normDoc: IDocDefaultOptions = {
        httpStatus: options?.response?.httpStatus ?? HttpStatus.OK,
        message,
        statusCode: options?.response?.statusCode,
    };

    if (!normDoc.statusCode) {
        normDoc.statusCode = normDoc.httpStatus;
    }

    docs.push(ApiConsumes('application/json'));
    docs.push(ApiProduces('application/json'));
    if (options?.response?.serialization) {
        normDoc.serialization = options?.response?.serialization;
    }

    docs.push(DocDefault(normDoc));

    if (options?.request?.params) {
        docs.push(...options?.request?.params.map((param) => ApiParam(param)));
    }

    if (options?.request?.queries) {
        docs.push(...options?.request?.queries.map((query) => ApiQuery(query)));
    }

    return applyDecorators(
        DocDefault({
            httpStatus: HttpStatus.BAD_REQUEST,
            message: 'http.serverError.badRequest',
            statusCode: 503,
        }),
        DocDefault({
            httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'http.serverError.internalServerError',
            statusCode: 500,
        }),
        ...docs
    );
}

export function DocDefault<T>(options: IDocDefaultOptions): MethodDecorator {
    const docs = [];
    const schema: Record<string, any> = {
        allOf: [{ $ref: getSchemaPath(ResponseDefaultSerialization<T>) }],
        properties: {
            message: {
                example: options.message,
            },
            statusCode: {
                type: 'number',
                example: options.statusCode,
            },
        },
    };

    if (options.serialization) {
        docs.push(ApiExtraModels(options.serialization));
        schema.properties = {
            ...schema.properties,
            data: {
                $ref: getSchemaPath(options.serialization),
            },
        };
    }

    return applyDecorators(
        ApiExtraModels(ResponseDefaultSerialization<T>),
        ApiResponse({
            status: options.httpStatus,
            schema,
        }),
        ...docs
    );
}

export function DocOneOf<T>(
    httpStatus: HttpStatus,
    ...documents: IDocOfOptions[]
): MethodDecorator {
    const docs = [];
    const oneOf = [];

    for (const doc of documents) {
        const oneOfSchema: Record<string, any> = {
            allOf: [{ $ref: getSchemaPath(ResponseDefaultSerialization<T>) }],
            properties: {
                message: {
                    example: doc.message,
                },
                statusCode: {
                    type: 'number',
                    example: doc.statusCode ?? HttpStatus.OK,
                },
            },
        };

        if (doc.serialization) {
            docs.push(ApiExtraModels(doc.serialization));
            oneOfSchema.properties = {
                ...oneOfSchema.properties,
                data: {
                    $ref: getSchemaPath(doc.serialization),
                },
            };
        }

        oneOf.push(oneOfSchema);
    }

    return applyDecorators(
        ApiExtraModels(ResponseDefaultSerialization<T>),
        ApiResponse({
            status: httpStatus,
            schema: {
                oneOf,
            },
        }),
        ...docs
    );
}
