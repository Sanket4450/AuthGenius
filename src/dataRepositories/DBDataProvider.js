class DbDataProvider {
    constructor () { }

    findOne(collectionName, queryObject) {
        return new Promise((resolve, reject) => {
            domain[collectionName]
                .findOne(queryObject.query)
                .then(results => {
                    resolve(results)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    create(collectionName, queryObject) {
        return new Promise((resolve, reject) => {
            domain[collectionName]
                .create(queryObject.data)
                .then(results => {
                    resolve(results)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    updateOne(collectionName, queryObject) {
        return new Promise((resolve, reject) => {
            domain[collectionName]
                .updateOne(queryObject.query, queryObject.data)
                .then(results => {
                    resolve(results)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

module.exports = new DbDataProvider()