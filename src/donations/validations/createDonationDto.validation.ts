import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';
import { z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}

export const createDonationSchema = z
  .object({
    name: z.string(),
    category: z.string(),
    image: z.string(),
    location: z.string(),
    publisherId: z.string(),
    phone: z.string(),
    details: z.string(),
    flexible: z.boolean(),
  })
  .required();

export type CreateDonationDto = z.infer<typeof createDonationSchema>;
