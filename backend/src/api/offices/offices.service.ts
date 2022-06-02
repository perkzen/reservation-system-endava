import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { OfficeRepository } from './repository/office.repository';
import { Errors } from '../../utils/errors';
import { Office } from './schemas/office.schema';
import { ReservationQuery, SuccessResponse } from '../../utils/interfaces';
import { ReservationsService } from '../reservations/reservations.service';
import mongoose from 'mongoose';

@Injectable()
export class OfficesService {
  constructor(
    private readonly officeRepository: OfficeRepository,
    private readonly reservationService: ReservationsService,
  ) {}

  async create(office: CreateOfficeDto): Promise<SuccessResponse> {
    const workspaces = office.workspaces.map((workspace) => {
      return {
        ...workspace,
        id: new mongoose.Types.ObjectId().toString(),
      };
    });
    await this.officeRepository.create({ ...office, workspaces });
    return { success: 'Office was created successfully' };
  }

  async findAllActive(): Promise<Office[]> {
    const offices = await this.officeRepository.find({});
    return offices.filter((office) => !office.disabled);
  }

  async findAll(): Promise<Office[]> {
    return await this.officeRepository.find({});
  }

  async findOfficeJSON(id: string): Promise<Office> {
    const office = await this.officeRepository.findOne({ _id: id });
    if (!office) {
      throw new HttpException(Errors.OFFICE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return office;
  }

  async findOne(id: string, { from, to }: ReservationQuery): Promise<Office> {
    const reservations =
      await this.reservationService.findOfficeReservationsByDate(id, {
        from,
        to,
      });
    const found = await this.officeRepository.findOne({ _id: id });

    if (!found) {
      throw new HttpException(Errors.OFFICE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (reservations) {
      found.workspaces = found.workspaces.map((workspace) => {
        for (const reservation of reservations) {
          for (const reservedWorkspaceId of reservation.workspaceId) {
            if (reservedWorkspaceId === workspace.id) {
              return {
                ...workspace,
                reserved: true,
                userId: reservation.userId,
                reservationId: reservation._id,
                from: reservation.from,
                to: reservation.to,
              };
            }
          }
        }
        return { ...workspace, reserved: false };
      });
    }

    return found;
  }

  async update(
    id: string,
    updateOfficeDto: UpdateOfficeDto,
  ): Promise<SuccessResponse> {
    const found = await this.officeRepository.findOneAndUpdate(
      { _id: id },
      updateOfficeDto,
    );

    if (!found) {
      throw new HttpException(Errors.OFFICE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return { success: 'Office was updated successfully' };
  }

  async toggleOffice(id: string) {
    const office = await this.officeRepository.findOne({ _id: id });
    if (!office) {
      throw new HttpException(Errors.OFFICE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.officeRepository.updateOne(
      { _id: id },
      { disabled: !office.disabled },
    );
  }

  async remove(id: string) {
    const found = await this.officeRepository.findOne({ _id: id });

    if (!found) {
      throw new HttpException(Errors.OFFICE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.officeRepository.deleteOne({ _id: id });
  }
}
