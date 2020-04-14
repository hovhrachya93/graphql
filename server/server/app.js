const express = require('express');
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('../schema/schema')
const config = require("./config");

const app = express();
const PORT = config.PORT;

mongoose.connect(config.mongoURI,
{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}
)

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true
}))

const dbConnection = mongoose.connection;
      dbConnection.on('error', err =>console.log(`Connection error: ${err}`));
      dbConnection.once(`open`, ()=> console.log(`Connected to DB!`));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
