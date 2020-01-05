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
