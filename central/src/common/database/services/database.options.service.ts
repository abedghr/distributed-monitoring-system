import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { IDatabaseOptionsService } from 'src/common/database/interfaces/database.options-service.interface';

@Injectable()
export class DatabaseOptionsService implements IDatabaseOptionsService {
    constructor(private readonly configService: ConfigService) {}

    createOptions(): MongooseModuleOptions {
        const host = this.configService.get<string>('database.host');
        const database = this.configService.get<string>('database.name');
        const user = this.configService.get<string>('database.user');
        const password = this.configService.get<string>('database.password');
        const replicaSet = this.configService.get<string>('database.replicaSet');

        const options = this.configService.get<string>('database.options')
            ? `?${this.configService.get<string>('database.options')}`
            : '';

        let uri = `${host}`;

        if (database) {
            uri = `${uri}/${database}${options}`;
        }

        const mongooseOptions: MongooseModuleOptions = {
            uri,
            serverSelectionTimeoutMS: 5000,
            autoCreate: true,
            autoIndex: true,
        };

        if (replicaSet) {
            mongooseOptions.replicaSet = replicaSet;
        }

        if (user && password) {
            mongooseOptions.auth = {
                username: user,
                password: password,
            };
        }
        console.log("ghrUri: ", uri);
        

        return mongooseOptions;
    }
}
