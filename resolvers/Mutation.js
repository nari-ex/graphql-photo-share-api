const { authorizeWithGithub } = require('../lib')

var _id = 0

module.exports = {
    postPhoto(parent, args) {
        var newPhoto = {
            id: _id++,
            ...args.input,
            created: new Date()
        }
        photos.push(newPhoto)
        return newPhoto
    }
}
