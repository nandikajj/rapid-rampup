import { BullModule } from '@nestjs/bull';

export const bullProviders = BullModule.registerQueue({
  name: 'excel-queue',
});
