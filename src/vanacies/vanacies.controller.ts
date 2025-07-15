import { Controller } from '@nestjs/common';
import { VanaciesService } from './vanacies.service';

@Controller('vanacies')
export class VanaciesController {
  constructor(private readonly vanaciesService: VanaciesService) {}
}
