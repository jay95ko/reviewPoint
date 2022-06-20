const { pointLog: PointLogMDB } = require('../mysql-model');

exports.createLog = async ({
  userId,
  reviewId,
  point,
  reason,
}, transaction) => await PointLogMDB.create({
  userId,
  reviewId,
  point,
  reason,
}, { transaction });

// eslint-disable-next-line max-len
exports.getPointByReview = async (reviewId) => {
  const pointLogs = await PointLogMDB.findAll({ where: { reviewId } });

  return pointLogs.reduce((acc, cur) => {
    acc += cur.point;

    return acc;
  }, 0);
};
