'use strict';
const bcryptjs = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isEmail:true,
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    } 
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user){
        let salt = bcryptjs.genSaltSync(10)
        let hash = bcryptjs.hashSync(user.password, salt)
    
        user.password = hash
      }
    }
  });
  return User;
};