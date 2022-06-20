'use strict';

module.exports = (sequelize, DataTypes, Model) => {
  class Review extends Model {}

  Review.init(
    {
      id: {
        type: DataTypes.STRING(128),
        allowNull: false,
        primaryKey: true,
      },

      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      placeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      attachedPhotoIds: {
        type: DataTypes.TEXT,
        allowNull: false,
        default: '[]',
      },
    },
    {
      sequelize,
      modelName: 'review',
      tableName: 'review',
      paranoid: true,
      timestamps: true,
      indexes: [
        {
          name: 'idx_userId_placeId',
          unique: false,
          fields: [
            {
              attribute: 'userId',
            },
            {
              attribute: 'placeId',
            },
          ],
        },
      ],
    },
  );

  Review.associate = (models) => {
    Review.belongsTo(models.user, {
      foreignKey: 'userId',
      targetKey: 'id',
    });

    Review.belongsTo(models.place, {
      foreignKey: 'placeId',
      targetKey: 'id',
    });

    Review.hasMany(models.photo, {
      foreignKey: 'reviewId',
      sourceKey: 'id',
    });

    Review.hasMany(models.pointLog, {
      foreignKey: 'reviewId',
      sourceKey: 'id',
    });
  };
  return Review;
};
