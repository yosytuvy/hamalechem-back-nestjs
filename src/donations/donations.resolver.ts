import { EditDonationInput } from './models/editDonation.model';
import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Donation } from './models/donation.model';
import { DonationsService } from './donations.service';
import { AddDonationInput } from './models/addDonation.model';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard, Roles } from 'src/auth/guards/role.guard';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { GraphQlInterceptor } from './interceptors/graphQL.interceptor';
import { GraphQlCecheKey } from './decorators/graphQLCecheKey.decorator';
import { GraphQLError } from 'graphql';

@Resolver((of) => Donation)
export class DonationsResolver {
  constructor(private donationsService: DonationsService) {}

  @Query((returns) => [Donation])
  @UseInterceptors(CacheInterceptor)
  @CacheKey('donations')
  async donations() {
    return this.donationsService.findAll();
  }

  @Query((returns) => Donation)
  // @UseGuards(JwtGuard, new RoleGuard(Roles.SOLIDER))
  @UseInterceptors(GraphQlInterceptor)
  @GraphQlCecheKey('donation')
  async donation(@Args('_id', { type: () => ID }) _id: string) {
    try {
      const donation = await this.donationsService.findOne(_id);
      return donation;
    } catch (error) {
      throw new GraphQLError(error.response.message, {
        extensions: {
          code: error.response.statusCode,
        },
      });
    }
  }

  @Mutation((returns) => Donation)
  @UseGuards(JwtGuard, new RoleGuard(Roles.SOLIDER))
  async addDonation(
    @Args('addDonation') addDonationInput: AddDonationInput,
    @Context('user') user: any,
  ) {
    return await this.donationsService.create(user.sub, addDonationInput);
  }

  @Mutation((returns) => Donation)
  @UseGuards(JwtGuard, new RoleGuard(Roles.SOLIDER))
  async editDonation(
    @Args('id') id: string,
    @Args('editDonation') editDonationInput: EditDonationInput,
    @Context('user') user: any,
  ) {
    return await this.donationsService.edit(id, user.sub, editDonationInput);
  }
}
