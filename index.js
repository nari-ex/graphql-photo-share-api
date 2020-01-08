// loading apollo-server module
const { ApolloServer } = require(`apollo-server`)

const typeDefs = `
    scalar DateTime

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
        taggedUsers: [Photo!]!
        created: DateTime!
       }

    type User {
        githubLogin: ID!
        name: String
        avarar: String
        postedPhotos: [Photo!]!
        inPhotos: [User!]!
    }

    input PostPhotoInput{
        name: String!
        category: PhotoCategory=PORTRAIT
        description: String
    }

    type Query {
        totalPhotos: Int!
        allPhotos(after: DateTime): [Photo!]!
    }

    type Mutation {
        postPhoto(input: PostPhotoInput!): Photo!
    }
`

var _id = 0
var photos = []

const serialize = value => new Date(value).toISOString()

const parseValue = value => new Date(value)

const parseLiteral = ast => ast.value

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
        },
        taggedUsers: parent => tags
            .filter(tag => tag.photoID === parent.id)
            .map(tag => tag.userID)
            .map(userID => users.find(u => u.githubLogin === userID))
    },
    User: {
        postedPhotos: parent => {
            return photos.filter(p => p.githubUser === parent.githubLogin)
        },
        inPhotos: parent => tags
            .filter(tag => tag.userID === parent.id)
            .map(tag => tag.photoID)
            .map(photoID => photos.find(p => p.id === photoID))
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


var users = [
    { "githubLogin": "mHattrup", "name": "Mike Hattrup" },
    { "githubLogin": "gPlake", "name": "Glen Plake" },
    { "githubLogin": "sSchmidt", "name": "Scot Schmidt" }
]
var photos = [
    {
        "id": "1",
        "name": "Dropping the Heart Chute",
        "description": "The heart chute is one of my favorite chutes", "category": "ACTION",
        "githubUser": "gPlake"
    }, {
        "id": "2",
        "name": "Enjoying the sunshine", "category": "SELFIE", "githubUser": "sSchmidt"
    }, {
        "id": "3",
        "name": "Gunbarrel 25",
        "description": "25 laps on gunbarrel today", "category": "LANDSCAPE",
        "githubUser": "sSchmidt"
    }
]

var tags = [
    { "photoID": "1", "userID": "gPlake" },
    { "photoID": "2", "userID": "sSchmidt" }, { "photoID": "2", "userID": "mHattrup" }, { "photoID": "2", "userID": "gPlake" }
]
