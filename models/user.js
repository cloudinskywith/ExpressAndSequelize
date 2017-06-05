'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        email:{
            type: DataTypes.STRING,
            unique:true,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }
    }, {
        classMethods: {
            associate: function (models) {
                User.hasMany(models.Task);
            }
        }
    });
    return User;
};