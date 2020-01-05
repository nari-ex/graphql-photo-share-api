// loading apollo-server module
const {ApolloServer } = require(`apollo-server`)

const typeDefs = `
    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
    }

    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }

    type Mutation {
        postPhoto(name: String! description: String): Photo!
    }
`

var photos = []

// def resolver

const resolvers = {
    Query: {
        totalPhotos: () => 42
    },

    Mutation: {
        postPhoto(parent, args) {
            photos.push(args)
            return true
        }
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
