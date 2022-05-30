import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Settings, SettingsDocument } from '../Schemas/settings.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class SettingsRepository {
  constructor(
    @InjectModel(Settings.name) private settingsModel: Model<SettingsDocument>,
  ) {}

  async findOne(
    reservationFilterQuery: FilterQuery<Settings>,
  ): Promise<Settings> {
    return this.settingsModel.findOne(reservationFilterQuery);
  }

  async findOneAndUpdate(
    reservationFilterQuery: FilterQuery<Settings>,
    reservation: Partial<Settings>,
  ) {
    return this.settingsModel.findOneAndUpdate(
      reservationFilterQuery,
      reservation,
    );
  }
}
