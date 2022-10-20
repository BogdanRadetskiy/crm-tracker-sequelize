import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckResult, HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private readonly health: HealthCheckService, private readonly memory: MemoryHealthIndicator) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([async () => this.memory.checkRSS('mem_rss', 768 * 2 ** 20 /* 768 MB */)]);
  }
}
