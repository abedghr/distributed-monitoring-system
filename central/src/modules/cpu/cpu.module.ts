import { Module } from '@nestjs/common';
import { CpuMetricController } from './controllers/cpu-metric.controller';
import { CpuService } from './services/cpu.service';
import { CpuRepositoryModule } from './repositories/cpu.repository.module';
import { RedisModule } from 'src/common/redis/redis.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [CpuRepositoryModule, RedisModule, ScheduleModule.forRoot()],
  controllers: [CpuMetricController],
  providers: [CpuService],
  exports: [CpuService],
})
export class CpuModule {}
