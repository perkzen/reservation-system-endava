import { Injectable, OnModuleInit } from '@nestjs/common';
import { SettingsRepository } from './repository/settings.repository';
import { Settings, SuccessResponse } from '../../utils/interfaces';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService implements OnModuleInit {
  private readonly SETTINGS_ID = '6295119f5a88ab1756e43212';
  private settings: Settings;

  constructor(private readonly settingsRepository: SettingsRepository) {}

  getSettings() {
    return this.settings;
  }

  async fetchSettings() {
    this.settings = await this.settingsRepository.findOne({
      _id: this.SETTINGS_ID,
    });
    return this.settings;
  }

  async updateSettings(data: UpdateSettingsDto): Promise<SuccessResponse> {
    console.log(data);
    await this.settingsRepository.findOneAndUpdate(
      { _id: this.SETTINGS_ID },
      data,
    );
    return { success: 'Settings have been updated successfully' };
  }

  async onModuleInit() {
    this.settings = await this.fetchSettings();
  }
}
