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
    return await this.donationService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    return await this.donationService.findOne(id);
  }
}
