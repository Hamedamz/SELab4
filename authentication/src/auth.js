const { User } = require('./db/models/user');
const { WrongLoginInfoException, UserAlreadyExist } = require('./exceptions');
const { getSaltHashPassword, getJWTToken } = require('./utils/crypto');

exports.registerUser = async (username, password, mobile, email) => {
  const hashPassword = getSaltHashPassword(password);

  const newUser = new User(
    {
      username,
      mobile,
      email,
      hash_password: hashPassword,
    },
  );

  const oldUser = await User.findOne({ username});

  if (oldUser) {
    throw new UserAlreadyExist('User already exists.');
  }

  const user = await newUser.save();

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    mobile: user.mobile,
    role: user.role,
  };
};

exports.getTokenFromUsernameAndPassword = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new WrongLoginInfoException('Authentication failed. User not found.');
  }

  const isVerified = user.verifyPassword(password);

  if (!isVerified) {
    throw new WrongLoginInfoException('Authentication failed. Wrong password.');
  } else {
    return {
      token: getJWTToken({
        username,
        id: user.id,
        role: user.role,
      }),
    };
  }
};
