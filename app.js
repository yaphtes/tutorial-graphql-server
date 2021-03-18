const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3005;

// Put db uri here
const dBUri = "";

mongoose.connect(dBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const DBConnection = mongoose.connection;
DBConnection.on('error', err => console.log(`DB connection errorL ${err}`));
DBConnection.once('open', () => console.log('DB connected!'));

app.listen(PORT, err => {
  err ? console.log(err) : console.log(`Server started on port: ${PORT}`);
});
