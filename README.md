# A small graphQL server
#### based on `micro` and `apollo-server-micro`

##### Install

> git clone https://github.com/benjaminboruff/mini-graphql.git
> cd mini-graphql && yarn

##### Usage

* Development
    In one terminal:
    >yarn dev:babel

    In another terminal:
    >yarn dev:micro

* Build and start server
    >yarn start

* Make a production build in `dist/`
    >yarn build

* A simple client data request using `curl`
    > curl -XPOST -H "Content-Type:application/json"  -d '{"query": "{books { title author}}"}'  http://localhost:3000/graphql