const { User } = require('./db/models/user');
const { UserNotFoundException, Forbidden } = require('./exceptions');
const { userRoles } = require('./enums');

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
            role: user.role,
          });
        }
      }
    );
  });
};

exports.getAllUsers = async (role) => {
  if (role !== userRoles.ADMIN) {
    throw new Forbidden();
  }

  const users = await User.find();

  return users.map((user) => ({
    id: user.id,
    username: user.username,
    mobile: user.mobile,
    email: user.email,
    role: user.role,
  }));
};

exports.updateProfile = async (userId, newProfile) => {
  const user = await User.findByIdAndUpdate(
    userId,
    newProfile,
    { new: true },
  );

  if (!user) {
    throw new UserNotFoundException();
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    mobile: user.mobile,
    role: user.role,
  };
};
