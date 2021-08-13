class WrongLoginInfoException extends Error {
  constructor (message) {
    super(message);
    this.name = 'WrongLoginInfoException';
    this.httpStatusCode = 401;
  }
}

class UserAlreadyExist extends Error {
  constructor (message) {
    super(message);
    this.name = 'UserAlreadyExist';
    this.httpStatusCode = 402;
  }
}


exports.WrongLoginInfoException = WrongLoginInfoException;
exports.UserAlreadyExist = UserAlreadyExist;
