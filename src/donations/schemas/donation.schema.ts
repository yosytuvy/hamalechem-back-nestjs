import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DonationDocument = HydratedDocument<Donation>;

@Schema()
export class Donation {
  @Prop()
  name: string;

  @Prop()
  category: string;

  @Prop()
  image: string;

  @Prop()
  location: string;

  @Prop()
  publisherId: string;

  @Prop()
  phone: string;

  @Prop()
  details: string;

  @Prop()
  flexible: boolean;
}

export const DonationSchema = SchemaFactory.createForClass(Donation);
