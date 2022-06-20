module.exports = class RedisError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
    this.name = 'Redis Error';
  }
};
