module.exports = class DBError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
    this.name = 'DB Error';
  }
};
