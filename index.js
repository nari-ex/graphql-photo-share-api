// loading apollo-server module
const { ApolloServer } = require(`apollo-server`)

const typeDefs = `
    enum PhotoCategory {
        SELFIE
        PORTRAIT
        ACTION
        LANDSCAPE
        GRAPHIC
    }

    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
        postedBy: User!
    }

    type User {
        githubLogin: ID!
        name: String
        avarar: String
        postedPhotos: [Photo!]!
    }

    input PostPhotoInput{
        name: String!
        category: PhotoCategory=PORTRAIT
        description: String
    }

    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }

    type Mutation {
        postPhoto(input: PostPhotoInput!): Photo!
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
                ...args.input
            }
            photos.push(newPhoto)
            return newPhoto
        }
    },
    Photo: {
        url: parent => `http://example.com/img/${parent.id}.jpg`,
        postedBy: parent => {
            return users.find(u => u.githubLogin === parent.githubUser)
        }
    },
    User: {
        postedPhotos: parent => {
        return photos.filter(p => p.githubUser === parent.githubLogin)
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
    .then(({ url }) => console.log(`GraphQL Serveice running on ${url}`))
