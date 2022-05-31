import { Global, Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Settings, SettingsSchema } from './Schemas/settings.schema';
import { SettingsRepository } from './repository/settings.repository';
import { SettingsController } from './settings.controller';
import { User, UserSchema } from '../users/schemas/user.schema';
import { UsersRepository } from '../users/repository/users.repository';
import { UsersService } from '../users/users.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Settings.name, schema: SettingsSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [SettingsController],
  providers: [
    SettingsService,
    SettingsRepository,
    UsersRepository,
    UsersService,
  ],
  exports: [SettingsService],
})
export class SettingsModule {}
