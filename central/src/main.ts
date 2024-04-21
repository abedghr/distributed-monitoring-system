import { NestApplication, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import swaggerInit from './swagger';


async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  const configService = app.get(ConfigService);
  const host: string = configService.get<string>('app.http.host');
  const port: number = configService.get<number>('app.http.port');
  const globalPrefix: string = configService.get<string>('app.globalPrefix');
  app.setGlobalPrefix(globalPrefix);  
  // Swagger
  await swaggerInit(app);
  await app.listen(port, host);
}
bootstrap();
