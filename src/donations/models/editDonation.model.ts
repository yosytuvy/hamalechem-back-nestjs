import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class EditDonationInput {
  @Field()
  name?: string;

  @Field()
  category?: string;

  @Field()
  image?: string;

  @Field()
  location?: string;

  @Field({nullable:true})
  phone?: string;

  @Field()
  details?: string;

  @Field()
  flexible?: boolean;
}
