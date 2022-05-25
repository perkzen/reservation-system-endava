import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { User } from '../../decorators/user.decorator';
import { Reservation } from './Schemas/reservation.schema';
import { SuccessResponse } from '../../utils/interfaces';

@ApiTags('Reservation')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @ApiOkResponse({ description: 'Creates new reservation' })
  @Post()
  async create(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<SuccessResponse> {
    return await this.reservationsService.create(createReservationDto);
  }

  @ApiOkResponse({
    description: 'Retrieves all reservations from current user',
  })
  @Get()
  async findAll(@User('uid') userId: string): Promise<Reservation[]> {
    return await this.reservationsService.findAllByUser(userId);
  }

  @ApiOkResponse({
    description: 'Retrieves all past reservations from user',
  })
  @Get('history')
  async findAllReservations(
    @User('uid') userId: string,
  ): Promise<Reservation[]> {
    return await this.reservationsService.findAllReservationsByUser(userId);
  }

  @ApiOkResponse({ description: 'Cancel reservation ' })
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @User('uid') userId: string,
  ): Promise<SuccessResponse> {
    return await this.reservationsService.remove(id, userId);
  }
}
