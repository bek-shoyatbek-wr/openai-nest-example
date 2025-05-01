import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [OpenaiController],
  providers: [OpenaiService, ConfigService],
})
export class OpenaiModule {}
