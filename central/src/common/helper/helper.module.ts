import { Global, Module } from '@nestjs/common';
import { HelperDateTimeService } from './services/helper.datetime.service';

@Global()
@Module({
    providers: [
        HelperDateTimeService,
    ],
    exports: [
        HelperDateTimeService,
    ],
    controllers: [],
    imports: [],
})
export class HelperModule {}
