const { User } = require('./db/models/user');
const { WrongLoginInfoException } = require('./exceptions');
const { getSaltHashPassword, getJWTToken} = require('./utils/crypto');

exports.registerUser = async (username, password, mobile, email) => {
  const hashPassword = getSaltHashPassword(password);

  const user = new User(
    {
      username,
      mobile,
      email,
      hash_password: hashPassword,
    }
  );

  return new Promise((resolve, reject) => {
    user.save(function(error, user) {
      if (error) {
        reject(error);
      } else {
        resolve({
          id: user.id,
          username: user.username,
          email: user.email,
          mobile: user.mobile,
        });
      }
    });
  });
};

exports.getTokenFromUsernameAndPassword = async (username, password) => {
  return new Promise((resolve, reject) => {
    User.findOne(
      { username },
      function(error, user) {
        if (error) {
          reject(error);
        }
        if (!user) {
          reject(new WrongLoginInfoException('Authentication failed. User not found.'));
        } else if (user) {
          const isVerified = user.verifyPassword(password);

          if (!isVerified) {
            reject(new WrongLoginInfoException('Authentication failed. Wrong password.'));
          } else {
            resolve({
              token: getJWTToken({
                username,
                id: user.id,
              })
            });
          }
        }
      }
    );
  });
};
