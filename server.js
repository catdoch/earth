const express = require('express');
const compression = require('compression');
require('dotenv').config();

const { server } = require('./schema');

const app = express();
app.use(compression());

if (!process.env.ENGINE_API_KEY) {
  throw new Error(
    'Please provide an API key for Apollo Engine in the environment variable ENGINE_API_KEY.'
  );
}

server.applyMiddleware({app});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`The server has started on port: ${PORT}`);
  console.log(`http://localhost:${PORT}/graphql`);
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(`${__dirname}/client/build`));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.render(`${__dirname}/client/public/index.html`);
  });
}
