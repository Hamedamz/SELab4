const axios = require('axios');

exports.getUserProfile = async (userId, authToken) => {
  const { data } = await axios.get(`http://localhost:8080/profile/${userId}`, {
    headers: {
      authorization: authToken,
    },
  });

  return data;
};
