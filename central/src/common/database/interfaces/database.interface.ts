import { PopulateOptions } from 'mongoose';

// find one
export interface IDatabaseFindOneOptions<T = any> {
    select?: Record<string, boolean | number>;
    join?: boolean | PopulateOptions | PopulateOptions[];
    withDeleted?: boolean;
    readFromSecondary?: boolean
    allowDiskUse?: boolean
}

export type IDatabaseGetTotalOptions<T = any> = Pick<IDatabaseFindOneOptions<T>,'withDeleted' | 'join'>;

export interface IDatabaseFindAllOptions<T = any>
{}

export interface IDatabaseExistOptions<T = any> 
    extends Pick<IDatabaseFindOneOptions<T>,'withDeleted' | 'join'> { excludeId?: string[]; }

export type IDatabaseSoftDeleteManyOptions<T = any> =Pick<IDatabaseFindOneOptions<T>, 'join'>;

export type IDatabaseRestoreManyOptions<T = any> = Pick<IDatabaseFindOneOptions<T>, 'join'>;

export type IDatabaseRawOptions<T = any> = Pick<IDatabaseFindOneOptions<T>,'readFromSecondary' | 'allowDiskUse'>;
