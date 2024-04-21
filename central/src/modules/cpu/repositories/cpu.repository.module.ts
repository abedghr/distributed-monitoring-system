import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/mongo/constants/database.constant';
import { CpuRepository } from './repositories/cpu.repository';
import { CpuEntity, CpuSchema } from './entities/cpu.entity';

@Module({
    providers: [CpuRepository],
    exports: [CpuRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: CpuEntity.name,
                    schema: CpuSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class CpuRepositoryModule {}
