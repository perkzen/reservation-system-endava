import { Injectable } from '@nestjs/common';
import { Office, OfficeDocument } from '../schemas/office.schema';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOfficeDto } from '../dto/create-office.dto';

@Injectable()
export class OfficeRepository {
  constructor(
    @InjectModel(Office.name) private officeModel: Model<OfficeDocument>,
  ) {}

  async findOne(officeFilterQuery: FilterQuery<Office>): Promise<Office> {
    return this.officeModel.findOne(officeFilterQuery);
  }

  async find(officeFilterQuery: FilterQuery<Office>): Promise<Office[]> {
    return this.officeModel.find(officeFilterQuery);
  }

  async create(office: CreateOfficeDto): Promise<Office> {
    const newOffice = new this.officeModel(office);
    return newOffice.save();
  }

  async findOneAndUpdate(
    officeFilterQuery: FilterQuery<Office>,
    office: Partial<Office>,
  ) {
    return this.officeModel.findOneAndUpdate(officeFilterQuery, office);
  }

  async deleteOne(officeFilterQuery: FilterQuery<Office>) {
    return this.officeModel.deleteOne(officeFilterQuery);
  }
}
