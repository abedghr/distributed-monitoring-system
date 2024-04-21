import { collectAndTransmitMetrics } from './cpuMetrics';
setInterval(collectAndTransmitMetrics, 5000);