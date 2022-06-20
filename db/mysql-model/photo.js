'use strict';

module.exports = (sequelize, DataTypes, Model) => {
  class Photo extends Model {}

  Photo.init(
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

      url: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },

    },
    {
      sequelize,
      modelName: 'photo',
      tableName: 'photo',
      paranoid: true,
      timestamps: true,
    },
  );

  Photo.associate = (models) => {
    Photo.belongsTo(models.review, {
      foreignKey: 'reviewId',
      targetKey: 'id',
    });
  };
  return Photo;
};
