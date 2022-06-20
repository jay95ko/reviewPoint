const redis = require('redis');
const RedisError = require('../module/error/redis.error');

const { redisHost, port } = require('../config').redis;
const redisClient = redis.createClient(port, redisHost);

redisClient.connect().then(() => {
  console.log('Redis client connect');
});

exports.set = async (key, value) => {
  try {
    return await redisClient.set(key, value);
  } catch (e) {
    throw new RedisError(e);
  }
};

exports.get = async (key) => {
  try {
    return await redisClient.get(key);
  } catch (e) {
    throw new RedisError(e);
  }
};

exports.delete = async (key) => {
  try {
    return await redisClient.del(key);
  } catch (e) {
    throw new RedisError(e);
  }
};
