class NotFoundException extends Error {
  constructor (message) {
    super(message);
    this.name = 'NotFound';
    this.httpStatusCode = 404;
  }
}

class Forbidden extends Error {
  constructor (message) {
    super(message);
    this.name = 'Forbidden';
    this.httpStatusCode = 403;
  }
}


exports.NotFoundException = NotFoundException;
exports.Forbidden = Forbidden;
