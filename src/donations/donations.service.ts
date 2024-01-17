import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Donation } from './schemas/donation.schema';
import { Model } from 'mongoose';
import { CreateDonationDto } from './dto/create-donation.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donation.name) private donationModel: Model<Donation>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createDonationDto: CreateDonationDto) {
    const createDonation = new this.donationModel(createDonationDto);
    const newDonation = createDonation.save();
    await this.cacheManager.reset();
    return newDonation;
  }

  async findAll() {
    const allProducts = await this.donationModel.find().exec();
    return allProducts;
  }

  async findOne(id) {
    try {
      const donationFromDB = await this.donationModel.findById(id);
      return donationFromDB;
    } catch (error) {
      throw new NotFoundException('Item not found');
    }
  }
}
