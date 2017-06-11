let serverURLs = {
    "dev": {
        "NODE_SERVER": "http://localhost",
        "NODE_SERVER_PORT": "3000",
        "MONGO_HOST": 'localhost',
        "MONGO_USER": '',
        "MONGO_PASSWORD": '',
        'MONGO_DATABASE': 'VOD'
    },
    "test": {
        
    },
    "production": {
        
    }
}

module.exports = {
    serverURLs: serverURLs
}
