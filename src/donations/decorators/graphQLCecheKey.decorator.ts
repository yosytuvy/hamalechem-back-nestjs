import { SetMetadata } from '@nestjs/common';

// Add metadata (the argument) to the function
export const GraphQlcecheKey = (cecheKeyValue) =>
  SetMetadata('graphQLCecheKey', cecheKeyValue);
