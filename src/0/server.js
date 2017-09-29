const express = require('express');
const graphqlHTTP = require('express-graphql');
let buildSchema;

({buildSchema} = require('graphql'));

const schema = buildSchema(`
  type Query {
    hello: String
    me: User
  }
  type User {
    name: String
  }
`);

const root = {
  hello: () => {
    return 'Hello world!';
  }, me: () => {
    return {
      name: () => "Preston Garno"
    }
  },
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema, rootValue: root, graphiql: true,
}));

app.listen(4000);
process.title = 'ktq-node';
