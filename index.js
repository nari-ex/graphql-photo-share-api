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

var _id = 0
var photos = []

// def resolver

const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos
    },

    Mutation: {
        postPhoto(parent, args) {
            var newPhoto = {
                id: _id++,
                ...args
            }
            photos.push(newPhoto)

            return newPhoto
        }
    },
    Photo: {
        url: parent => `http://example.com/img/${parent.id}.jpg`
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
