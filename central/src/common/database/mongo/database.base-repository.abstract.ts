import {
    IDatabaseFindOneOptions,
    IDatabaseRawOptions,
    IDatabaseGetTotalOptions,
} from 'src/common/database/interfaces/database.interface';

export abstract class DatabaseBaseRepositoryAbstract<Entity> {
    abstract findAll<T = Entity>(
        find?: Record<string, any>,
        options?: IDatabaseFindOneOptions<any>
    ): Promise<T[]>;

    abstract findOne<T = Entity>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions<any>
    ): Promise<T>;

    abstract findOneById<T = Entity>(
        _id: string,
        options?: IDatabaseFindOneOptions<any>
    ): Promise<T>;

    abstract getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions<any>
    ): Promise<number>;

    abstract create<Dto = any>(
        data: Dto,
    ): Promise<Entity>;

    abstract save(
        repository: Entity,
    ): Promise<Entity>;

    abstract delete(
        repository: Entity,
    ): Promise<Entity>;

    abstract deleteMany(
        find: Record<string, any>,
    ): Promise<boolean>;

    abstract updateMany<Dto>(
        find: Record<string, any>,
        data: Dto,
    ): Promise<boolean>;

    abstract aggregate<RawResponse, RawQuery = any>(
        rawOperation: RawQuery,
        options?: IDatabaseRawOptions
    ): Promise<RawResponse[]>;

    abstract model(): Promise<any>;
}
