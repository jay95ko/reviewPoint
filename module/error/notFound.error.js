module.exports = class NotFoundError extends Error {
  constructor(message, status = 404) {
    super(message);
    this.status = status;
    this.name = 'Not found Error';
  }
};
