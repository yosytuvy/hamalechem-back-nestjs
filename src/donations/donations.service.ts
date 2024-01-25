import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Donation } from './schemas/donation.schema';
import { Model } from 'mongoose';
import { CreateDonationDto } from './dto/create-donation.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { EditDonationDto } from './dto/edit-donation.dto';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donation.name) private donationModel: Model<Donation>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

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

  async create(publisherId: string, createDonationDto: CreateDonationDto) {
    const createDonation = new this.donationModel({
      publisherId,
      ...createDonationDto,
    });
    const newDonation = createDonation.save();
    await this.cacheManager.reset();
    return newDonation;
  }

  async edit(
    id: string,
    publisherId: string,
    editDonationDto: EditDonationDto,
  ) {
    const productFromDB = await this.findOne(id);    
    
    if (productFromDB.publisherId != publisherId)
      throw new UnauthorizedException('Not Authorize!');

    const updateDonation = await this.donationModel.findByIdAndUpdate(id, {
      publisherId,
      ...editDonationDto,
    });
    const newDonation = await updateDonation.save();
    await this.cacheManager.reset();
    return newDonation;
  }
}
