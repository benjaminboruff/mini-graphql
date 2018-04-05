# A small GraphQL server
#### using [micro](https://github.com/zeit/micro), [microrouter](https://www.npmjs.com/package/microrouter), and [apollo-server-micro](https://www.npmjs.com/package/apollo-server-micro)

##### Install

> git clone https://github.com/benjaminboruff/mini-graphql.git

> cd mini-graphql && yarn

##### Usage

* Development - watches and builds ES* in one terminal, and runs `micro-dev` in another.

    In one terminal:
    >yarn dev:babel

    In another terminal:
    >yarn dev:micro

* Build and start server - compiles using babel, and starts the *production* `micro` server.
    >yarn start

* Make a production build in `dist/`
    >yarn build

* A simple client data request using `curl`
    > curl -XPOST -H "Content-Type:application/json"  -d '{"query": "{books { title author { firstName lastName }}}"}'  http://localhost:3000/graphql