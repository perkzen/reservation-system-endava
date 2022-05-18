import { Module } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { OfficesController } from './offices.controller';
import { OfficeRepository } from './repository/office.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Office, OfficeSchema } from './schemas/office.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Office.name, schema: OfficeSchema }]),
  ],
  controllers: [OfficesController],
  providers: [OfficesService, OfficeRepository],
})
export class OfficesModule {}
