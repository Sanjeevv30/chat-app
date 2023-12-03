const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const ArchiveDb=sequelize.define("ArchiveDb",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    message:Sequelize.STRING,
    userId:Sequelize.INTEGER,
    groupId:Sequelize.INTEGER,
    userName:Sequelize.STRING
})

module.exports=ArchiveDb
