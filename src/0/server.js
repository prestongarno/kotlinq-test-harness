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
    return 'world';
  }, me: () => {
    return {
      name: () => "Preston Garno"
    }
  },
};

const app = express();

app.get('/status', function(req, res) {
  res.code = 200;
  res.setHeader('Content-Type', 'application/json');
  res.send('{ "status": "okay" }');
});

app.use('/graphql', graphqlHTTP({
  schema: schema, rootValue: root, graphiql: true,
}));

app.listen(4000);
process.title = 'ktq-node';
