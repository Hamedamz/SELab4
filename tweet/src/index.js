const app = require('./server');

const { connectToDataBase } = require('./db');

const port = 8001;

app.listen(port, async () => {
  await connectToDataBase();

  console.log(`Tweet service listening at http://localhost:${port}`);
});
