import { Injectable } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@Injectable()
export class AppService {
  @ApiOkResponse({ description: 'Api is up and running' })
  getPing(): string {
    return 'The API is up and running.';
  }
}
