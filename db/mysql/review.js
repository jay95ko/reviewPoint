const { review: ReviewMDB } = require('../mysql-model');

exports.create = async ({
  reviewId, content, userId, placeId, attachedPhotoIds,
}, transaction) => {
  const review = await ReviewMDB.create({
    id: reviewId, content, userId, placeId, attachedPhotoIds,
  }, { transaction });

  return review;
};

exports.update = async ({
  reviewId, content, attachedPhotoIds,
}, transaction) => {
  const review = await ReviewMDB.findByPk(reviewId);

  await review.update({ content, attachedPhotoIds }, { transaction });
};

exports.findDuplicateReview = async (userId, placeId) => {
  const reviews = await ReviewMDB.findAll({
    where: {
      userId,
      placeId,
    },
  });

  return reviews.length;
};

exports.getReviewByUserAndPlace = async (userId, placeId) => {
  const review = await ReviewMDB.findOne({
    where: {
      userId,
      placeId,
    },
  });

  return review;
};

exports.getReviewCountByPlace = async (placeId) => await ReviewMDB.count({ where: { placeId } });

// eslint-disable-next-line max-len
exports.deleteById = async ({ reviewId }, transaction) => await ReviewMDB.destroy({ where: { id: reviewId } }, { transaction });
