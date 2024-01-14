import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Donation model' })
export class Donation {
  @Field((type) => ID)
  _id: string;

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
