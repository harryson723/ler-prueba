const { connectToDatabase } = require('./connection');

// database related modules
module.exports = {
    databaseConnection: connectToDatabase,
    userRepository: require('./repository/usersRepository'),
    
}