import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools';
import resolvers from '../resolvers/books';
import mocks from './mocks';

// The GraphQL schema in string form
const typeDefs = `
  type Query {
    allBooks: [Book]
    allAuthors: [Author]
    author(id: Int): Author
    book(id: Int, title: String): Book
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

// addMockFunctionsToSchema({schema, mocks});

export default schema;
