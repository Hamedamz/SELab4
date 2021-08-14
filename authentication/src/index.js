const app = require('./server');

const { connectToDataBase } = require('./db');

const port = 3000;

app.listen(port, async () => {
  await connectToDataBase();

  console.log(`Auth service listening at http://localhost:${port}`);
});
