// backend/index.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const cors = require('cors');

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
    deleteNews(id: ID!): News
    updateNews(id: ID!, title: String!, content: String!): News
  }
`);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const News = mongoose.model('News', {
  title: String,
  content: String
});

// Root resolver
const root = {
  getNews: () => {
    // Get news from the database
    return News.find();
  },
  addNews: ({ title, content }) => {
    // Add news to the database
    const news = new News({ title, content });
    return news.save();
  },
  deleteNews: async ({ id }) => {
    return await News.findByIdAndDelete(id);
  },
  updateNews: async ({ id, title, content }) => {
    console.log({ id, title, content });
    return await News.findByIdAndUpdate(id, { title, content }, { new: true });
  }
};

const app = express();

app.use(cors());
app.use(express.json());
app.use('/graphql', (req, res, next) => {
    console.log( `Received a ${req.method} request to ${req.originalUrl}` );
    console.log( `Request body: ${JSON.stringify(req.body)}` );
  next();
});

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () =>
  console.log('Server running on http://localhost:4000/graphql')
);
