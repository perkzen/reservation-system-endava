import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { OfficeRepository } from './repository/office.repository';
import { Errors } from '../../utils/errors';
import { Office } from './schemas/office.schema';

@Injectable()
export class OfficesService {
  constructor(private readonly officeRepository: OfficeRepository) {}

  async create(createOfficeDto: CreateOfficeDto): Promise<Office> {
    return await this.officeRepository.create(createOfficeDto);
  }

  async findAll() {
    await this.officeRepository.find({});
  }

  async findOne(id: string) {
    const found = await this.officeRepository.findOne({ _id: id });

    if (!found) {
      throw new HttpException(Errors.OFFICE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return found;
  }

  async update(id: string, updateOfficeDto: UpdateOfficeDto) {
    const found = await this.officeRepository.findOneAndUpdate(
      { _id: id },
      updateOfficeDto,
    );

    if (!found) {
      throw new HttpException(Errors.OFFICE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    await this.officeRepository.deleteOne({ _id: id });
  }
}
