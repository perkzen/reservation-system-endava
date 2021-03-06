import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OfficesService } from './offices.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../guards/auth.guard';
import { Roles } from '../../decorators/role.decorator';
import { Role } from '../../utils/role';
import { RoleGuard } from '../../guards/role.guard';
import { ReservationQuery, SuccessResponse } from '../../utils/interfaces';
import { Office } from './schemas/office.schema';

@ApiTags('Office')
@Controller('offices')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  @ApiOkResponse({ description: 'Creates new office' })
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @Post()
  async create(
    @Body() createOfficeDto: CreateOfficeDto,
  ): Promise<SuccessResponse> {
    return await this.officesService.create(createOfficeDto);
  }

  @ApiOkResponse({ description: 'Retrieves all active offices' })
  @Get()
  async findAllActive(): Promise<Office[]> {
    return this.officesService.findAllActive();
  }

  @ApiOkResponse({ description: 'Retrieves all offices' })
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @Get('all')
  async findAll(): Promise<Office[]> {
    return this.officesService.findAll();
  }

  @ApiOkResponse({ description: 'Retrieves information about a office' })
  @ApiQuery({ name: 'from' })
  @ApiQuery({ name: 'to' })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query() query: ReservationQuery,
  ): Promise<Office> {
    return this.officesService.findOne(id, query);
  }

  @ApiOkResponse({ description: 'Retrieves office JSON' })
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @Get('json/:id')
  async findOfficeJSON(@Param('id') id: string): Promise<Office> {
    return this.officesService.findOfficeJSON(id);
  }

  @ApiOkResponse({ description: 'Updates office information' })
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOfficeDto: UpdateOfficeDto,
  ): Promise<SuccessResponse> {
    return this.officesService.update(id, updateOfficeDto);
  }

  @ApiOkResponse({ description: 'Disables or enables office' })
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @Put('toggle/:id')
  async disableOrEnableOffice(@Param('id') id: string) {
    return this.officesService.toggleOffice(id);
  }

  @ApiOkResponse({ description: 'Deletes office' })
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.officesService.remove(id);
  }
}
