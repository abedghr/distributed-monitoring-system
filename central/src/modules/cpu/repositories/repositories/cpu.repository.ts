import { Injectable } from '@nestjs/common';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { Model } from 'mongoose';
import { DatabaseMongoObjectIdRepositoryAbstract } from 'src/common/database/mongo/repositories/database.mongo.object-id.repository.abstract';
import { CpuDoc, CpuEntity } from '../entities/cpu.entity';

@Injectable()
export class CpuRepository extends DatabaseMongoObjectIdRepositoryAbstract<
    CpuEntity,
    CpuDoc
> {
    constructor(
        @DatabaseModel(CpuEntity.name)
        private readonly cpuModel: Model<CpuEntity>
    ) {
        super(cpuModel);
    }

    async getNodesList(): Promise<Array<string>> {
      return this.distinct('node', {readFromSecondary: true});
    }

    async getCPUUsage(timestampFrom: number, timestampTo: number, groupingIntervalEquation: number, node?: string): Promise<Response[]> {      
        
        let matchStage = {}
        if (node) {
            matchStage = {...matchStage, ...{node}}
        }

        matchStage = {
            ...matchStage,
            ...{
                timestamp: { 
                    $gte: timestampFrom,
                    $lt: timestampTo
                } 
            }
        }

        const pipeline = [
            { 
                $match: matchStage
            },
            {
              $group: {
                _id: {
                  $toDate: {
                    $subtract: [
                      { $toLong: "$timestamp" },
                      { $mod: [{ $toLong: "$timestamp" }, groupingIntervalEquation] }
                    ]
                  }
                },
                avgCpuUsagePercentage: { $avg: "$usagePercentage" },
                minCpuUsagePercentage: { $min: "$usagePercentage" },
                maxCpuUsagePercentage: { $max: "$usagePercentage" },
                count: { $sum: 1 }
              }
            },
            { $sort: { _id: 1 } }
        ];        

        return await this.aggregate(pipeline, {readFromSecondary: true});
    }

    async getGeneralStatistics(timestampFrom: number, timestampTo: number, node?: string): Promise<Response[]> {
      
      let matchStage = {}
        if (node) {
            matchStage = {...matchStage, ...{node}}
        }

        matchStage = {
            ...matchStage,
            ...{
                timestamp: { 
                    $gte: timestampFrom,
                    $lt: timestampTo
                } 
            }
        }

        const pipeline = [
          { 
              $match: matchStage
          },
          {
            $group: {
              _id: null,
              avgCpuUsagePercentage: { $avg: "$usagePercentage" },
              minCpuUsagePercentage: { $min: "$usagePercentage" },
              maxCpuUsagePercentage: { $max: "$usagePercentage" }
            }
          },
          {
            $project: {
              _id: 0,
            }
          },
        ];

        return await this.aggregate(pipeline, {readFromSecondary: true});
    }
}
