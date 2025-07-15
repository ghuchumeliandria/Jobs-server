import { Module } from '@nestjs/common';
import { VanaciesService } from './vanacies.service';
import { VanaciesController } from './vanacies.controller';

@Module({
  controllers: [VanaciesController],
  providers: [VanaciesService],
})
export class VanaciesModule {}
