import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class addDonationInput {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field()
  image: string;

  @Field()
  location: string;

  @Field()
  publisherId: string;

  @Field()
  phone: string;

  @Field()
  details: string;

  @Field()
  flexible: boolean;
}
