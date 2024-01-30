import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from './schemas/request.schema';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request.name) private requestModeol: Model<Request>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll() {
    const allRequests = await this.requestModeol.find().exec();
    return allRequests;
  }

  async findOne(id) {
    try {
      const requestFromDB = await this.requestModeol.findById(id);
      return requestFromDB;
    } catch (error) {
      throw new NotFoundException('Item not found');
    }
  }
}
