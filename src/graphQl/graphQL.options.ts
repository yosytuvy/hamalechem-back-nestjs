import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/dist/esm/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

const GraphQlOptions = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: 'schema.graphql',
  playground: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
});

export default GraphQlOptions;
