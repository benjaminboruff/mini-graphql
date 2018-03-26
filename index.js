const { microGraphiql, microGraphql } = require('apollo-server-micro')
const { send } = require('micro')
const { get, post, router } = require('microrouter')
const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = require('./types/books')
const resolvers = require('./resolvers/books')

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const graphqlHandler = microGraphql({ schema })
const graphiqlHandler = microGraphiql({ endpointURL: '/graphql' })

module.exports = router(
  get('/graphql', graphqlHandler),
  post('/graphql', graphqlHandler),
  get('/graphiql', graphiqlHandler),
  (req, res) => send(res, 404, 'not found')
)
