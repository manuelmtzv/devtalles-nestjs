import { Controller, Get } from '@nestjs/common';
import { SeedService } from '@/modules/seed/seed.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Auth()
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  async seed() {
    return this.seedService.seed();
  }
}
