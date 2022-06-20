'use strict';

module.exports = (sequelize, DataTypes, Model) => {
  class Place extends Model {}

  Place.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'place',
      tableName: 'place',
      paranoid: true,
      timestamps: true,
    },
  );

  Place.associate = (models) => {
    Place.hasMany(models.review, {
      foreignKey: 'placeId',
      sourceKey: 'id',
    });
  };
  return Place;
};
