import { Test, TestingModule } from '@nestjs/testing';
import { CpuMetricController } from './cpu-metric.controller';

describe('CpuController', () => {
  let controller: CpuMetricController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CpuMetricController],
    }).compile();

    controller = module.get<CpuMetricController>(CpuMetricController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
