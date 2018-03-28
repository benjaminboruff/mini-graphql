import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../resolvers/books';

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;