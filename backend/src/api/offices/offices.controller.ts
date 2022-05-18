import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OfficesService } from './offices.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Office')
@Controller('offices')
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  @ApiOkResponse({ description: 'Creates new office' })
  @Post()
  create(@Body() createOfficeDto: CreateOfficeDto) {
    return this.officesService.create(createOfficeDto);
  }

  @ApiOkResponse({ description: 'Retrieves all offices' })
  @Get()
  async findAll() {
    return this.officesService.findAll();
  }

  @ApiOkResponse({ description: 'Retrieves information about a office' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.officesService.findOne(id);
  }

  @ApiOkResponse({ description: 'Updates office information' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOfficeDto: UpdateOfficeDto,
  ) {
    return this.officesService.update(id, updateOfficeDto);
  }

  @ApiOkResponse({ description: 'Deletes office' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.officesService.remove(id);
  }
}
