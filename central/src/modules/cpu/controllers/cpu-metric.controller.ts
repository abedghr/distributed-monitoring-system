import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { CpuService } from '../services/cpu.service';
import { RedisService } from 'src/common/redis/services/redis.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CpuMetricCreateDto } from '../dtos/cpu-metric.create.dto';
import { Response } from 'src/common/response/decorators/response.decorator';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { CPUUsageCreateDoc, CPUUsageGetDoc } from '../docs/cpu.doc';
import { CpuMetricGetDto } from '../dtos/cpu-metric.get.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('CPU Metric')
@Controller('cpu-metric')
export class CpuMetricController {
    constructor(
        private readonly cpuService: CpuService,
        private readonly redisService: RedisService,
    ) {}

    @CPUUsageCreateDoc()
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post()
    async create(@Body() cpuData: CpuMetricCreateDto): Promise<void> {
        await this.redisService.storeCpuData(cpuData);
    }

    @Cron(CronExpression.EVERY_30_SECONDS)
    async flushCacheToDatabase(): Promise<void> {
        const cachedData = await this.redisService.getCachedCpuData(0, 1000);
        if (cachedData && cachedData.length > 0) {
            await this.redisService.removeCpuData(0, 1000);
            await this.cpuService.create(cachedData);
            
        }
    }

    @Get('nodes-list')
    @Response('NodesList')
    async getNodes(): Promise<IResponse> {
        return {
            data: await this.cpuService.getNodesList()
        };
    }
    
    @CPUUsageGetDoc()
    @Get()
    @Response('CPUUsage')
    async getCPUUsage(@Query() query: CpuMetricGetDto): Promise<IResponse> {
        return {
            data: await this.cpuService.getCPUUsage(query.dateTimeFrom, query.dateTimeTo, query.node)
        };
    }
}
