import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { OPEN_API_MODEL, REQUEST_TIMEOUT } from './constants';

@Injectable()
export class OpenaiService {
  private readonly openAIClient: OpenAI;
  constructor(private readonly configService: ConfigService) {
    this.openAIClient = new OpenAI({
      apiKey: configService.get<string>('OPENAI_API_KEY'),
      timeout: REQUEST_TIMEOUT,
    });
  }

  getClient() {
    return this.openAIClient;
  }

  async request(prompt: string) {
    return await this.openAIClient.chat.completions.create({
      model: OPEN_API_MODEL,
      store: true,
      messages: [{ role: 'assistant', content: prompt }],
    });
  }
}
