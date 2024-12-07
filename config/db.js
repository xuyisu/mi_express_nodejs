// database.js
const { Sequelize } = require('sequelize');
const { dbConfig } = require('./config');


// 创建 Sequelize 实例
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect, // 或者 'postgres', 'sqlite', 'mariadb', 'mssql'
    timezone: 'Asia/Shanghai', // 设置时区为上海
  }
);
// 测试数据库连接
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;