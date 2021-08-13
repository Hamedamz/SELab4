class WrongLoginInfoException extends Error {
  constructor (message) {
    super(message);
    this.name = 'WrongLoginInfoException';
  }
}

exports.WrongLoginInfoException = WrongLoginInfoException;
