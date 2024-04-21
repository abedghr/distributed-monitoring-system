import {
    ClientSession,
    Model,
    PipelineStage,
    PopulateOptions,
    Types,
    Document,
} from 'mongoose';
import {
    IDatabaseFindOneOptions,
    IDatabaseGetTotalOptions,
    IDatabaseSoftDeleteManyOptions,
    IDatabaseRawOptions,
} from 'src/common/database/interfaces/database.interface';
import { DATABASE_IS_DELETED_FIELD_NAME } from '../constants/database.constant';
import { DatabaseBaseRepositoryAbstract } from '../database.base-repository.abstract';

export abstract class DatabaseMongoObjectIdRepositoryAbstract<
    Entity,
    EntityDocument
> extends DatabaseBaseRepositoryAbstract<EntityDocument> {
    protected _repository: Model<Entity>;
    protected _joinOnFind?: PopulateOptions | PopulateOptions[];

    constructor(
        repository: Model<Entity>,
        options?: PopulateOptions | PopulateOptions[]
    ) {
        super();

        this._repository = repository;
        this._joinOnFind = options;
    }

    async findAll<T = Entity>(
        find?: Record<string, any>,
        options?: IDatabaseFindOneOptions<ClientSession>
    ): Promise<T[]> {
        const findAll = this._repository.find<Entity>(find);

        if (!options?.withDeleted) {
            findAll.where(DATABASE_IS_DELETED_FIELD_NAME, false);
        }

        if (options?.select) {
            findAll.select(options.select);
        }

        if (options?.join) {
            findAll.populate(
                typeof options.join === 'boolean'
                    ? this._joinOnFind
                    : (options.join as PopulateOptions | PopulateOptions[])
            );
        }

        if (options?.readFromSecondary) {
            findAll.read('secondary');
        }
        
        if (options?.allowDiskUse) {
            findAll.allowDiskUse(true);
        }

        return findAll.lean() as any;
    }

    async findOne<T = EntityDocument>(
        find: Record<string, any>,
        options?: IDatabaseFindOneOptions<ClientSession>
    ): Promise<T> {
        const findOne = this._repository.findOne<EntityDocument>(find);

        if (!options?.withDeleted) {
            findOne.where(DATABASE_IS_DELETED_FIELD_NAME, false);
        }

        if (options?.select) {
            findOne.select(options.select);
        }

        if (options?.join) {
            findOne.populate(
                typeof options.join === 'boolean'
                    ? this._joinOnFind
                    : (options.join as PopulateOptions | PopulateOptions[])
            );
        }

        if (options?.readFromSecondary) {
            findOne.read('secondary');
        }
        
        if (options?.allowDiskUse) {
            findOne.allowDiskUse(true);
        }

        return findOne.exec() as any;
    }

    async findOneById<T = EntityDocument>(
        _id: string,
        options?: IDatabaseFindOneOptions<ClientSession>
    ): Promise<T> {
        const findOne = this._repository.findById<EntityDocument>(
            new Types.ObjectId(_id)
        );

        if (!options?.withDeleted) {
            findOne.where(DATABASE_IS_DELETED_FIELD_NAME, false);
        }

        if (options?.select) {
            findOne.select(options.select);
        }

        if (options?.join) {
            findOne.populate(
                typeof options.join === 'boolean'
                    ? this._joinOnFind
                    : (options.join as PopulateOptions | PopulateOptions[])
            );
        }

        if (options?.readFromSecondary) {
            findOne.read('secondary');
        }
        
        if (options?.allowDiskUse) {
            findOne.allowDiskUse(true);
        }

        return findOne.exec() as any;
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseGetTotalOptions<ClientSession>
    ): Promise<number> {
        const count = this._repository.countDocuments(find);

        if (!options?.withDeleted) {
            count.where(DATABASE_IS_DELETED_FIELD_NAME, false);
        }

        if (options?.join) {
            count.populate(
                typeof options.join === 'boolean'
                    ? this._joinOnFind
                    : (options.join as PopulateOptions | PopulateOptions[])
            );
        }

        return count;
    }

    async create<Dto = any>(
        data: Dto,
    ): Promise<EntityDocument> {
        const dataCreate: Record<string, any> = data;
        const created = await this._repository.create([dataCreate]);
        return created[0] as EntityDocument;
    }

    async distinct (
        field: string,
        options?:  IDatabaseFindOneOptions<ClientSession>
    ): Promise<Array<string>> {
        const distinct = this._repository.distinct(field).read('secondary');
        if (options?.readFromSecondary) {
            distinct.read('secondary');
        }
        return distinct;
    }

    async createMany<Dto>(
        data: Dto[],
    ): Promise<boolean> {
        const create = this._repository.insertMany(data);
        try {
            await create;
            return true;
        } catch (err: unknown) {
            throw err;
        }
    }

    async save(
        repository: EntityDocument & Document<Types.ObjectId>
    ): Promise<EntityDocument> {
        return repository.save();
    }

    async delete(
        repository: EntityDocument & Document<Types.ObjectId>,
    ): Promise<EntityDocument> {
        return repository.deleteOne();
    }

    async softDelete(
        repository: EntityDocument &
            Document<Types.ObjectId> & { isDeleted: boolean, deletedAt?: Date },
    ): Promise<EntityDocument> {
        repository.isDeleted = true;
        repository.deletedAt = new Date();
        return repository.save();
    }

    async deleteMany(
        find: Record<string, any>,
    ): Promise<boolean> {
        const del = this._repository.deleteMany(find);
        try {
            await del;
            return true;
        } catch (err: unknown) {
            throw err;
        }
    }

    async softDeleteMany(
        find: Record<string, any>,
        options?: IDatabaseSoftDeleteManyOptions<ClientSession>
    ): Promise<boolean> {
        const softDel = this._repository
            .updateMany(find, {
                $set: {
                    deletedAt: new Date(),
                },
            })
            .where(DATABASE_IS_DELETED_FIELD_NAME, false)
            .exists(false);

        if (options?.join) {
            softDel.populate(
                typeof options.join === 'boolean'
                    ? this._joinOnFind
                    : (options.join as PopulateOptions | PopulateOptions[])
            );
        }

        try {
            await softDel;
            return true;
        } catch (err: unknown) {
            throw err;
        }
    }

    async updateMany<Dto>(
        find: Record<string, any>,
        data: Dto,
    ): Promise<boolean> {
        const update = this._repository
            .updateMany(find, {
                $set: data,
            })
            .where(DATABASE_IS_DELETED_FIELD_NAME, false)
            .exists(false);

        try {
            await update;
            return true;
        } catch (err: unknown) {
            throw err;
        }
    }

    async update(
        repository: EntityDocument & Document<string>,
    ): Promise<EntityDocument> {
        return repository.save();
    }

    
    async aggregate<RawResponse, RawQuery = PipelineStage[]>(
        rawOperation: RawQuery,
        options?: IDatabaseRawOptions
    ): Promise<RawResponse[]> {
        if (!Array.isArray(rawOperation)) {
            throw new Error('Must in array');
        }

        const pipeline: PipelineStage[] = rawOperation;

        const aggregate = this._repository.aggregate<RawResponse>(pipeline);
        
        if (options?.readFromSecondary) {
            aggregate.read('secondary');
        }
        
        if (options?.allowDiskUse) {
            aggregate.allowDiskUse(true);
        }

        return aggregate;
    }

    async bulkWrite(operations: any): Promise<object> {
        return await this._repository.bulkWrite(operations);
    }

    async model(): Promise<Model<Entity>> {
        return this._repository;
    }
}
