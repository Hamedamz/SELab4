const app = require('./server');

const { connectToDataBase } = require('./db');

const port = 8000;

app.listen(port, async () => {
  await connectToDataBase();

  console.log(`Profile service listening at http://localhost:${port}`);
});
