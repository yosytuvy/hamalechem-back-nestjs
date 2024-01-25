import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddDonationInput {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field()
  image: string;

  @Field()
  location: string;

  @Field()
  phone: string;

  @Field()
  details: string;

  @Field()
  flexible: boolean;
}
