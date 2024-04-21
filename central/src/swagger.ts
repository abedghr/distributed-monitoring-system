import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseDefaultSerialization } from 'src/common/response/serializations/response.default.serialization';

export default async function (app: NestApplication) {
    const configService = app.get(ConfigService);
    const env: string = configService.get<string>('app.env');
    const logger = new Logger();

    const docName: string = configService.get<string>('doc.name');
    const docDesc: string = configService.get<string>('doc.description');
    const docVersion: string = configService.get<string>('doc.version');
    const docPrefix: string = configService.get<string>('doc.prefix');

    const documentBuild = new DocumentBuilder()
        .setTitle(docName)
        .setDescription(docDesc)
        .setVersion(docVersion)
        .addServer(`/`)
        .build();

    const document = SwaggerModule.createDocument(app, documentBuild, {
        deepScanRoutes: true,
        extraModels: [
            ResponseDefaultSerialization,
        ],
    });

    SwaggerModule.setup(docPrefix, app, document, {
        explorer: true,
        customSiteTitle: docName,
    });

    logger.log(
        `==========================================================`
    );

    logger.log(`Docs will serve on ${docPrefix}`, 'NestApplication');

    logger.log(
        `==========================================================`
    );
}
