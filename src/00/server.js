var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
    me: User
  }
  type User {
    name: String
  }
`);

var root = {
  hello: () => {
    return 'Hello world!';
  },
  me: () => { return { 
    name: () => "Preston Garno" } 
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
process.title = 'ktq-node-harness'
console.log('Running a GraphQL API server at localhost:4000/graphql');
