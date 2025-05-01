import { Body, Controller, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { ApiBody } from '@nestjs/swagger';
import { RequestDto } from './dto';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post()
  @ApiBody({
    type: RequestDto,
    description: 'Enter request prompt',
  })
  async request(@Body('prompt') prompt: string) {
    return this.openaiService.request(prompt);
  }
}
