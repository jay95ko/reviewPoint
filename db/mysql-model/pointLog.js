'use strict';

module.exports = (sequelize, DataTypes, Model) => {
  class PointLog extends Model {}

  PointLog.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      reviewId: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },

      point: {
        type: DataTypes.INTEGER,
        default: 0,
      },

      reason: {
        type: DataTypes.ENUM('CREATE', 'DELETE', 'UPDATE'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'pointLog',
      tableName: 'point_log',
      paranoid: true,
      timestamps: true,
    },
  );

  PointLog.associate = (models) => {
    PointLog.belongsTo(models.user, {
      foreignKey: 'userId',
      targetKey: 'id',
    });

    PointLog.belongsTo(models.review, {
      foreignKey: 'reviewId',
      targetKey: 'id',
    });
  };
  return PointLog;
};
