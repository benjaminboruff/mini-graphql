import {microGraphiql, microGraphql} from 'apollo-server-micro';
import {send} from 'micro';
import {get, post, router} from 'microrouter';
import schema from './schema/books.js';

const graphqlHandler = microGraphql({schema});
const graphiqlHandler = microGraphiql({endpointURL: '/graphql'});

export default router(
  get('/graphql', graphqlHandler),
  post('/graphql', graphqlHandler),
  get('/graphiql', graphiqlHandler),
  (req, res) => send(res, 404, 'not found')
);
