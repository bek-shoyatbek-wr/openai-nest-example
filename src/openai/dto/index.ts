import { ApiProperty } from '@nestjs/swagger';

export class RequestDto {
  @ApiProperty()
  prompt: string;
}
