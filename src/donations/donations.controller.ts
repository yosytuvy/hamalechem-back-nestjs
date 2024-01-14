import { DonationsService } from './donations.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { CustomException } from 'src/utils/errorHandling.exception';
import {
  ZodValidationPipe,
  createDonationSchema,
} from './validations/createDonationDto.validation';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('donations')
export class DonationsController {
  constructor(private donationService: DonationsService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    try {
      return await this.donationService.findAll();
    } catch (error) {
      throw new CustomException(
        'error has accord',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { details: error },
      );
    }
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    try {
      return await this.donationService.findOne(id);
    } catch (error) {
      throw new CustomException(
        'error has accord',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { details: error },
      );
    }
  }

  @UsePipes(new ZodValidationPipe(createDonationSchema))
  @Post()
  async create(@Body() createDonationDto: CreateDonationDto) {
    try {
      return this.donationService.create(createDonationDto);
    } catch (error) {
      throw new CustomException(
        'error has accord',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { details: error },
      );
    }
  }
}
