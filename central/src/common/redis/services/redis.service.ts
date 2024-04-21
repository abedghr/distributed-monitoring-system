import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';


@Injectable()
export class RedisService {

  private readonly redisClient: Redis;
  private readonly redisUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.redisUrl = this.configService.get<string>('redis.url');    
    this.redisClient = new Redis(this.redisUrl);
  }

  async storeCpuData(cpuData: any): Promise<void> {
    await this.redisClient.zadd('cpuMetricsSortedSet', cpuData.timestamp, JSON.stringify(cpuData));
  }

  async getCachedCpuData(start: number, end: number): Promise<any[]> {
    const data = await this.redisClient.zrange('cpuMetricsSortedSet', start, end);
    return data.map(item => JSON.parse(item));
  }

  async removeCpuData(start: number, end: number): Promise<void> {
    await this.redisClient.zremrangebyrank('cpuMetricsSortedSet', start, end);
  }

}
