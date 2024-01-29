const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const ArchiveDb=sequelize.define("archiveDb",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    message:Sequelize.STRING,
    user:Sequelize.INTEGER,
    group:Sequelize.INTEGER,
    userName:Sequelize.STRING
})

module.exports=ArchiveDb
