import { CpuEntity } from 'src/modules/cpu/repositories/entities/cpu.entity';
import { RedisService } from '../services/redis.service';

export class RedisHandlers {
    constructor(private readonly redisService: RedisService) {}
  
    async handleStoreCpuData(data: CpuEntity): Promise<void> {
      await this.redisService.storeCpuData(data);
    }
  
    async handleGetCachedCpuData(start: number, end: number): Promise<CpuEntity[]> {
      return this.redisService.getCachedCpuData(start, end);
    }
  
    async handleRemoveCpuData(start: number, end: number): Promise<void> {
      await this.redisService.removeCpuData(start, end);
    }
  }
