import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const init = async () => {
  const app = express();

  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String
            say(name: String): String
        }
    `,
    resolvers: {
      Query: {
        hello: () => `Hey there! GRAPHQL SERVER`,
        say: (_, { name }: { name: string }) => `Hey ${name}, How are you?`,
      },
    },
  });

  await gqlServer.start();

  app.get('/', (req, res) => {
    res.json({ message: 'Server is up and running' });
  });

  app.use('/graphql', expressMiddleware(gqlServer));

  app.listen(PORT, () => console.log(`Server started at a PORT:${PORT}`));
};

init();
