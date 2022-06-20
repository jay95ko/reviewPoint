const redisClient = require('../db/redis');
const ReviewMDB = require('../db/mysql/review');
const UserMDB = require('../db/mysql/user');
const PointLogMDB = require('../db/mysql/pointLog');
const { sequelize } = require('../db/mysql-model');
const DBError = require('../module/error/db.error');
const AlreadyExistError = require('../module/error/alreadyExist.error');
const DoesNotExistError = require('../module/error/doesNotExist.error');

const checkFirstReview = async (placeId) => {
  const exist = await redisClient.get(`place${placeId}_review`);
  if (exist) return false;
  await redisClient.set(`place${placeId}_review`, 1);

  return true;
};

const calculatePoint = (content, attachedPhotoIds) => {
  let point = 0;
  if (content.length > 0) point += 1;
  if (attachedPhotoIds.length > 0) point += 1;

  return point;
};

exports.create = async ({
  reviewId,
  content,
  attachedPhotoIds = [],
  userId,
  placeId,
}) => {
  const reviewCount = await ReviewMDB.findDuplicateReview(userId, placeId);
  if (reviewCount > 0) throw new AlreadyExistError('Already exist review');

  const transaction = await sequelize.transaction();

  try {
    let point = calculatePoint(content, attachedPhotoIds);
    if (await checkFirstReview(placeId)) point += 1;

    attachedPhotoIds = JSON.stringify(attachedPhotoIds);

    const review = await ReviewMDB.create({
      reviewId, content, userId, placeId, attachedPhotoIds,
    }, transaction);

    await UserMDB.updatePoint({
      userId,
      point,
    }, transaction);
    await PointLogMDB.createLog({
      userId,
      reviewId,
      point,
      reason: 'CREATE',
    }, transaction);

    await transaction.commit();
  } catch (e) {
    await transaction.rollback();
    await redisClient.delete(`place${placeId}_review`);
    throw new DBError(e);
  }

  return 'Success create review';
};

exports.update = async ({
  reviewId,
  content,
  attachedPhotoIds = [],
  userId,
  placeId,
}) => {
  const review = await ReviewMDB.getReviewByUserAndPlace(userId, placeId);

  if (!review) throw new DoesNotExistError('Does not exist review');

  review.attachedPhotoIds = JSON.parse(review.attachedPhotoIds);
  // eslint-disable-next-line max-len
  const point = calculatePoint(content, attachedPhotoIds) - calculatePoint(review.content, review.attachedPhotoIds);

  const transaction = await sequelize.transaction();

  try {
    await UserMDB.updatePoint({
      userId,
      point,
    }, transaction);

    attachedPhotoIds = JSON.stringify(attachedPhotoIds);

    await ReviewMDB.update({
      reviewId: review.id, content, attachedPhotoIds,
    }, transaction);

    await PointLogMDB.createLog({
      userId,
      reviewId,
      point,
      reason: 'UPDATE',
    }, transaction);

    await transaction.commit();
  } catch (e) {
    await transaction.rollback();
    throw new DBError(e);
  }

  return 'Success update review';
};

exports.delete = async ({
  reviewId,
  userId,
  placeId,
}) => {
  const review = await ReviewMDB.getReviewByUserAndPlace(userId, placeId);

  if (!review) throw new DoesNotExistError('Does not exist review');

  const remainReviewCount = await ReviewMDB.getReviewCountByPlace(placeId);
  const point = await PointLogMDB.getPointByReview(reviewId);

  const transaction = await sequelize.transaction();

  try {
    await ReviewMDB.deleteById({ reviewId }, transaction);
    await UserMDB.updatePoint({ userId, point: -point }, transaction);
    await PointLogMDB.createLog({
      userId,
      reviewId,
      point: -point,
      reason: 'DELETE',
    }, transaction);

    await transaction.commit();
  } catch (e) {
    await transaction.rollback();
    throw new DBError(e);
  }

  if (remainReviewCount === 1) {
    await redisClient.delete(`place${placeId}_review`);
  }

  return 'Success delete review';
};
