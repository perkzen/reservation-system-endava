import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { SettingsService } from './settings.service';
import { Settings, SuccessResponse } from '../../utils/interfaces';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../../utils/role';
import { RoleGuard } from '../../guards/role.guard';

@ApiTags('Settings')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @ApiOkResponse({ description: 'Retrieves application settings' })
  @Get()
  async fetchSettings(): Promise<Settings> {
    return await this.settingsService.fetchSettings();
  }

  @ApiOkResponse({ description: 'Updates application settings' })
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @Put()
  async updateSettings(@Body() settings: Settings): Promise<SuccessResponse> {
    return await this.settingsService.updateSettings(settings);
  }
}
