import { Inject, Injectable } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  @Inject(ConfigService)
  public config: ConfigService;

  @ApiOkResponse({ description: 'Api is up and running' })
  getPing(): { success: string; env: string } {
    return {
      success: 'The API is up and running.',
      env: this.config.get('NODE_ENV'),
    };
  }
}
