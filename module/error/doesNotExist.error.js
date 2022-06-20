module.exports = class DoesNotExistError extends Error {
  constructor(message, status = 404) {
    super(message);
    this.status = status;
    this.name = 'Not exist Error';
  }
};
