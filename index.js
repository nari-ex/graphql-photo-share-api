// loading apollo-server module
const {ApolloServer } = require(`apollo-server`)

const typeDefs = `
    type Query {
        totalPhotos: Int!
    }

    type Mutation {
        postPhoto(name: String! description: String): Boolean!
    }
`

// def resolver

const resolvers = {
    Query: {
        totalPhotos: () => 42
    }
}

// def server

const server = new ApolloServer({
    typeDefs,
    resolvers
})

// start
server
    .listen()
    .then(({url}) => console.log(`GraphQL Serveice running on ${url}`))
