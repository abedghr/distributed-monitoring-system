export interface CPUMetrics {
    node: string;
    platform: string;
    usage: number;
    usagePercentage: number;
    averageCpuSpeed: number;
    minCpuSpeed: number;
    maxCpuSpeed: number;
    freeMemory: number;
    freeMemoryPercentage: number;
    totalMemory: number;
    date: Date;
    timestamp: number;
}