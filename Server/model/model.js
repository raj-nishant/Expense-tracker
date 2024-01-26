const {Sequelize}=require('sequelize')
const database=require('../database/database')
module.exports.Expenses=database.define('Expense',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    amount:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.CHAR,
        allowNull:false
    }
});