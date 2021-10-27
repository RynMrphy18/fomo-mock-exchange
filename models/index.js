const User = require('./User')
const Holding = require('./Holding');
const Transaction = require('./Transaction');

// associating the holding table to the user table thru the user id foreign key
User.hasMany(Holding, {
    foreignKey: 'user_id'
});
Holding.belongsTo(User);

// associating the transaction table to the user table thru the user id foreign key
User.hasMany(Transaction, {
    foreignKey: 'user_id'
});
Transaction.belongsTo(User);

module.exports = {User, Holding, Transaction};