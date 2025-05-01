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
    const result = await this.openAIClient.chat.completions.create({
      model: OPEN_API_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a translation assistant. Translate the user\'s input and return only JSON format like: { "translated": "<translated text>" }',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const message = result.choices[0]?.message?.content ?? '';
    return message;
  }
}
