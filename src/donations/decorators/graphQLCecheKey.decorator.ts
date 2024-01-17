import { SetMetadata } from '@nestjs/common';

// Add metadata (the argument) to the function
export const GraphQlCecheKey = (cecheKeyValue) =>
  SetMetadata('graphQLCecheKey', cecheKeyValue);
