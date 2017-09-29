const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphqlTools = require('graphql-tools');

const schemaText = `

  type Query {
    me: User
  }
  
  union Actor = User | Bot
  
  type User {
    name: String
  }
  
  type Bot {
    name: String
    owner: User
  }
`;

const meIrl = {
    name: () => "Preston Garno"
};

const resolvers = {
  Actor: {
    __resolveType(obj, context, info){
      if(obj.owner){
        return 'Bot';
      } else if (obj.name) {
        return 'Car';
      } else {
        return null
      }
    },
  },

  Query: {
    me: () => meIrl
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: graphqlTools.makeExecutableSchema({
    typeDefs: schemaText,
    resolvers: resolvers
  }),
  graphiql: true,
}));

app.listen(4000);
process.title = 'ktq-node';
