const dbRepo = require('./DBDataProvider')

class ResourceRepo {
    constructor() { }

    findOne(collection, queryObject) {
        return new Promise((resolve, reject) => {
            dbRepo
                .findOne(collection, queryObject)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    create(collection, queryObject) {
        return new Promise((resolve, reject) => {
            dbRepo
                .create(collection, queryObject)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    updateOne(collection, queryObject) {
        return new Promise((resolve, reject) => {
            dbRepo
                .updateOne(collection, queryObject)
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

module.exports = new ResourceRepo()