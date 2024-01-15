import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Donation } from './models/donation.model';
import { DonationsService } from './donations.service';
import { addDonationInput } from './models/addDonation.model';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard, Roles } from 'src/auth/guards/role.guard';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { GraphQlInterceptor } from './interceptors/graphQL.interceptor';
import { GraphQlcecheKey } from './decorators/graphQLCecheKey.decorator';

@Resolver((of) => Donation)
export class DonationsResolver {
  constructor(private donationsService: DonationsService) {}

  @Query((returns) => Donation)
  @UseGuards(JwtGuard, new RoleGuard(Roles.SOLIDER))
  @UseInterceptors(GraphQlInterceptor)
  @GraphQlcecheKey('donation')
  async donation(@Args('_id', { type: () => ID }) _id: string) {
    return this.donationsService.findOne(_id);
  }

  @Query((returns) => [Donation])
  @UseInterceptors(CacheInterceptor)
  @CacheKey('donations')
  async donations() {
    return this.donationsService.findAll();
  }

  @Mutation((returns) => Donation)
  async addDonation(@Args('addDonation') addDonation: addDonationInput) {
    return this.donationsService.create(addDonation);
  }
}
