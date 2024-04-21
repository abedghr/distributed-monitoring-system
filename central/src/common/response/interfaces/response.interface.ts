import { ClassConstructor } from 'class-transformer';


// decorator options

export interface IResponseOptions<T> {
    serialization?: ClassConstructor<T>;
}


// type
export interface IResponse {
    data: Record<string, any>;
}

