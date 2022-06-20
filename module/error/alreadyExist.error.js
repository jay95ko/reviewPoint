module.exports = class AlreadyExistError extends Error {
  constructor(message, status = 409) {
    super(message);
    this.status = status;
    this.name = 'Already exist Error';
  }
};
