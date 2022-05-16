import { Injectable } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@Injectable()
export class AppService {
  @ApiOkResponse({ description: 'Api is up and running' })
  getPing(): { success: string } {
    return { success: 'The API is up and running.' };
  }
}
