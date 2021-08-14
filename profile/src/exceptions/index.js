class UserNotFoundException extends Error {
  constructor (message) {
    super(message);
    this.name = 'UserNotFound';
    this.httpStatusCode = 404;
  }
}

exports.UserNotFoundException = UserNotFoundException;
