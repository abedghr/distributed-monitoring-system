import si from 'systeminformation';
import os from 'os';
import { TransmitMetrics } from './api/central';
import { CPUMetrics } from './interfaces/CpuUsageInterface';

export async function collectAndTransmitMetrics(): Promise<void> {
  try {
    const node: string = generateUniqueNodeId();
    if (!node) {
        throw new Error('CPU node ID is missing!');
    }

    const cpuUsagePercentage = await si.currentLoad();
    const usagePercentage: number = parseFloat(cpuUsagePercentage.currentLoad.toFixed(2));
    const usage: number = usagePercentage / 100;

    const cpuSpeed = await si.cpuCurrentSpeed();
    const averageCpuSpeed: number = parseFloat(cpuSpeed.avg.toFixed(2));
    const minCpuSpeed: number = parseFloat(cpuSpeed.avg.toFixed(2));
    const maxCpuSpeed: number = parseFloat(cpuSpeed.avg.toFixed(2));

    const memoryData = await si.mem();
    const freeMemory: number = memoryData.free;
    const totalMemory: number = memoryData.total;
    const freeMemoryPercentage = parseFloat((freeMemory / totalMemory * 100).toFixed(2));

    const platform: string = os.platform();
    
    const timezone = process.env.TIMEZONE || 'UTC';
    const date = new Date(new Date().toLocaleString('en-US', { timeZone: timezone }));
    const timestamp = date.getTime();

    const metricData: CPUMetrics = {
        node,
        platform,
        usage,
        usagePercentage,
        averageCpuSpeed,
        minCpuSpeed,
        maxCpuSpeed,
        freeMemory,
        freeMemoryPercentage,
        totalMemory,
        date,
        timestamp
    };

    await TransmitMetrics(metricData);
    console.log('CPU metrics sent successfully:', metricData);
  } catch (error: any) {
    console.error('Error collecting and transmitting CPU metrics : ', error.message);
  }
}

export function generateUniqueNodeId(): string {

  const networkInterfaces = os.networkInterfaces();
  let macAddress;
  for (const interfaceName in networkInterfaces) {
      const networkInterface = networkInterfaces[interfaceName];
      if (networkInterface) { // Ensure networkInterface is not undefined
        for (const { mac } of networkInterface) {
          if (mac && mac !== '00:00:00:00:00:00') {
              macAddress = mac;
              break;
          }
        }
      }
      if (macAddress) break;
  }
  const hostname :string = os.hostname();
  const envNodeIdentifier :string = process.env.NODE_IDENTIFIER || '';
  const uniqueIdParts = [envNodeIdentifier, hostname, macAddress].filter(Boolean);
  const uniqueId :string = uniqueIdParts.join('-');
  return uniqueId;
}

