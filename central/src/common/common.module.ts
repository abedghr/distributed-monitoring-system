import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseOptionsService } from './database/services/database.options.service';
import { DATABASE_CONNECTION_NAME } from './database/mongo/constants/database.constant';
import { DatabaseOptionsModule } from './database/database.options.module';
import { ConfigModule } from '@nestjs/config';
import configs from './configs';
import { RedisModule } from './redis/redis.module';
import { RequestModule } from './request/request.module';
import { HelperModule } from './helper/helper.module';


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            load: configs,
            isGlobal: true,
            cache: true,
            envFilePath: ['.env'],
            expandVariables: true,
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
        MongooseModule.forRootAsync({
            connectionName: DATABASE_CONNECTION_NAME,
            imports: [DatabaseOptionsModule],
            inject: [DatabaseOptionsService],
            useFactory: (databaseOptionsService: DatabaseOptionsService) =>
                databaseOptionsService.createOptions(),
        }),
        RedisModule,
        RequestModule,
        HelperModule
    ],
})
export class CommonModule {}
