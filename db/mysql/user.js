const { user: UserMDB } = require('../mysql-model');
const DoesNotExistError = require('../../module/error/doesNotExist.error');

exports.updatePoint = async ({
  userId,
  point,
}, transaction) => {
  const user = await UserMDB.findByPk(userId);
  if (!user) throw new DoesNotExistError();

  user.point += point;

  return await user.save({ transaction });
};
