const STATUS_CODES = require('../utils/costants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
}

module.exports = NotFoundError;