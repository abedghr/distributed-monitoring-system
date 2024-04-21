import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { DatabaseMongoObjectIdEntityAbstract } from 'src/common/database/mongo/database.mongo.object-id.entity.abstract';

export const databaseName = 'cpu_metric';
@DatabaseEntity({ collection: databaseName })
export class CpuEntity extends DatabaseMongoObjectIdEntityAbstract {
  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  node: string;
  
  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  platform: string;

  @Prop({
    required: true,
    type: Number,
  })
  usage: number;
  
  @Prop({
    required: true,
    type: Number,
  })
  usagePercentage: number;
  
  @Prop({
    required: true,
    type: Number,
  })
  averageCpuSpeed: number;

  @Prop({
    required: true,
    type: Number,
  })
  minCpuSpeed: number;
  
  @Prop({
    required: true,
    type: Number,
  })
  maxCpuSpeed: number;
  
  @Prop({
    required: true,
    type: Number,
  })
  freeMemory: number;
  
  @Prop({
    required: true,
    type: Number,
  })
  freeMemoryPercentage: number;
  
  @Prop({
    required: true,
    type: Number,
  })
  totalMemory: number;
  
  @Prop({
    required: true,
    type: Date,
  })
  date: Date;
  
  @Prop({
    required: true,
    type: Number,
  })
  timestamp: number;
}

export const CpuSchema = SchemaFactory.createForClass(CpuEntity);

export type CpuDoc = CpuEntity & Document;


/*
  ******************************** BEGIN INDEXES ******************************************
*/


CpuSchema.index({ node: 1, timestamp: 1 }, { name: 'node-timestamp-ndx'});
CpuSchema.index({ timestamp: 1 }, { name: 'timestamp-ndx'});

/*
  ******************************** END INDEXES ******************************************
*/