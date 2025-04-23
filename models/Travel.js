const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Travel = sequelize.define('Travel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: true,
  },
  name:{
    type: DataTypes.STRING,
    allowNull:false,
  },
},{
  tableName: 'travellist',    // 실제 테이블 이름
  timestamps: false,    // createdAt, updatedAt 컬럼 사용 안 함
});

module.exports = Travel;