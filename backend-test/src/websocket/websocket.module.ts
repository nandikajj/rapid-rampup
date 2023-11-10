import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websocket.gateway';
import { ExcelQueue } from 'src/excel.queue';

@Module({
  imports: [],

  controllers: [],
  providers: [WebsocketsGateway, ExcelQueue],
  exports: [WebsocketsGateway],
})
export class WebSocketGatewayModule {}
