import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { CpuModule } from 'src/modules/cpu/cpu.module';

@Module({
  imports: [
    CommonModule,
    CpuModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
