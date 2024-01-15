import { SetMetadata } from '@nestjs/common';

export const GraphQlcecheKey = (cecheKeyValue) =>
  SetMetadata('graphQLCecheKey', cecheKeyValue);
