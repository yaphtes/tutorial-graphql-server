const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;

const dBUri = "mongodb+srv://graphql-tutorial-user:graphql-tutorial-user-9311@cluster0.xfgwd.mongodb.net/graphql-tutorial?retryWrites=true&w=majority";
mongoose.connect(dBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
