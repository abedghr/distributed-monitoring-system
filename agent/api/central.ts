import axios from 'axios';
import { CPUMetrics } from '../interfaces/CpuUsageInterface';
import dotenv from 'dotenv';
dotenv.config();

const CENTRAL_SERVER_URL: string = process.env.CENTRAL_SERVER_URL ?? '';

export async function TransmitMetrics(metricData: CPUMetrics): Promise<void> {
    if (!CENTRAL_SERVER_URL) {
        throw new Error('CENTRAL_SERVER_URL is not provided. Please provide the URL in your environment configuration.');
    }
    await axios.post(`${CENTRAL_SERVER_URL}/cpu-metric`, metricData);
}