const { User } = require('./db/models/user');
const { UserNotFoundException } = require('./exceptions');

exports.getProfile = async (username) => {
  return new Promise((resolve, reject) => {
    User.findOne(
      { username },
      function (error, user) {
        if (error) {
          reject(error);
        } else if (!user) {
          reject(new UserNotFoundException());
        } else {
          resolve({
            id: user.id,
            username: user.username,
            email: user.email,
            mobile: user.mobile,
          });
        }
      }
    );
  });
};
