const app = require('./server');

const port = 3000;

app.listen(port, async () => {
    console.log(`Auth service listening at http://localhost:${port}`);
});
