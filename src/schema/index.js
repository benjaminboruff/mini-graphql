import {makeExecutableSchema} from 'graphql-tools';
import resolvers from '../resolvers';

// The GraphQL type definitions in string form
const typeDefs = `
  type Query {
    books: [Book]
    book(id: Int, title: String): Book
    authors: [Author]
    author(id: Int, firstName: String, lastName: String): Author
  }

  type Author {
    id: Int!
    firstName: String
    lastName: String
    books: [Book]
  }

  type Book {
    id: Int!
    title: String!
    author: Author
  }
`;

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
