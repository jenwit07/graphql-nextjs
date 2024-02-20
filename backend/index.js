// backend/index.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

// Define a schema
const schema = buildSchema(`
  type News {
    id: ID!
    title: String!
    content: String!
  }

  type Query {
    getNews: [News]
  }

  type Mutation {
    addNews(title: String!, content: String!): News
  }
`);

// Root resolver
const root = {
  getNews: () => {
    // Fetch news from the database
  },
  addNews: ({ title, content }) => {
    // Add news to the database
  },
};

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/news', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Server running on http://localhost:4000/graphql'));
