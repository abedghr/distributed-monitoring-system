import {
  Injectable,
} from '@nestjs/common';
import { CpuRepository } from '../repositories/repositories/cpu.repository';
import { CpuMetricCreateDto } from '../dtos/cpu-metric.create.dto';
import { HelperDateTimeService } from 'src/common/helper/services/helper.datetime.service';

@Injectable()
export class CpuService {
  constructor(
    private readonly cpuRepository: CpuRepository,
    private readonly helperDateTimeService: HelperDateTimeService,
  ) {}

  async create(data: CpuMetricCreateDto[]) {
      this.cpuRepository.createMany(data)
  }
  
  async getNodesList(): Promise<Array<string>> {
      return this.cpuRepository.getNodesList();
  }
  
  async getCPUUsage(dateTimeFrom?: string, dateTimeTo?: string, node?: string): Promise<any> {
    const now = new Date();
    if (!dateTimeFrom) {
      dateTimeFrom = `${now.toISOString().slice(0, 10)} 00:00:00`;
    }

    if (!dateTimeTo) {
        dateTimeTo = `${now.toISOString().slice(0, 10)} 23:59:59`;
    }
    
    const {timestampFrom, timestampTo, groupingIntervalEquation} = this.helperDateTimeService.calculateIntervals(dateTimeFrom, dateTimeTo);

    const genericResult: any = await this.cpuRepository.getGeneralStatistics(timestampFrom, timestampTo, node);
    const result: any = await this.cpuRepository.getCPUUsage(timestampFrom, timestampTo, groupingIntervalEquation, node);
    
    return {
      genericResult,
      result
    };
  }
}
