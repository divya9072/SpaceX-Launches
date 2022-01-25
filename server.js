const express=require('express');
const { graphqlHTTP } = require('express-graphql');
const schema= require('./schema')
// cors used to connect/send request from front to back
const cors =require('cors');
const { application } = require('express');

const app = express();

//allow cross-origin
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  }),
);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
