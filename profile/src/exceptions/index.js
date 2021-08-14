class UserNotFoundException extends Error {
  constructor (message) {
    super(message);
    this.name = 'UserNotFound';
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


exports.UserNotFoundException = UserNotFoundException;
exports.Forbidden = Forbidden;
