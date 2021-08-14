const mongoose = require('mongoose');

exports.connectToDataBase = () => {
  return new Promise((resolve) => {
    mongoose.connect(
      'mongodb+srv://hamed:bufdXpF2FWp8Jdy@selab.g2obx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => {
        console.log('Database connected');
        resolve();
      },
    );
  });
};
