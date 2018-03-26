import { microGraphiql, microGraphql } from 'apollo-server-micro'
import { send } from 'micro'
import { get, post, router } from 'microrouter'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './types/books'
import resolvers from './resolvers/books'

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const graphqlHandler = microGraphql({ schema })
const graphiqlHandler = microGraphiql({ endpointURL: '/graphql' })

console.log('hello')

export default router(
  get('/graphql', graphqlHandler),
  post('/graphql', graphqlHandler),
  get('/graphiql', graphiqlHandler),
  (req, res) => send(res, 404, 'not found')
)
