import { HttpStatus } from '@nestjs/common';
import { ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';
import {
    ENUM_DOC_REQUEST_BODY_TYPE,
    ENUM_DOC_RESPONSE_BODY_TYPE,
} from 'src/common/doc/constants/doc.enum.constant';

export interface IDocOfOptions {
    message: string;
    statusCode: number;
    serialization?: ClassConstructor<any>;
}

export interface IDocDefaultOptions {
    httpStatus: HttpStatus;
    message: string;
    statusCode: number;
    serialization?: ClassConstructor<any>;
}

export interface IDocOptions<T> {
    response?: IDocResponseOptions<T>;
    request?: IDocRequestOptions;
}

export interface IDocResponseOptions<T> {
    statusCode?: number;
    httpStatus?: HttpStatus;
    bodyType?: ENUM_DOC_RESPONSE_BODY_TYPE;
    serialization?: ClassConstructor<T>;
}

export interface IDocRequestOptions {
    params?: ApiParamOptions[];
    queries?: ApiQueryOptions[];
    bodyType?: ENUM_DOC_REQUEST_BODY_TYPE;
}
