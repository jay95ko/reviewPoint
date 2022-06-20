'use strict';

module.exports = (sequelize, DataTypes, Model) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },

      point: {
        type: DataTypes.INTEGER,
        default: 0,
      },
    },
    {
      sequelize,
      modelName: 'user',
      tableName: 'user',
      paranoid: true,
      timestamps: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.review, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });

    User.hasMany(models.pointLog, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });
  };
  return User;
};
