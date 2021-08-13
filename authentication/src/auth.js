const { User } = require('./db/models/user');
const { getSaltHashPassword } = require('./utils/crypto');

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
