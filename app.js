const express = require("express")
const mongoose = require('mongoose')
const app = express();
const parser = require("body-parser");
const dotenv = require('dotenv');
const path = require('path');
// accessing environment varaibles
dotenv.config({ path: path.resolve(__dirname+"/src", 'config', '.env') });
const authRouter = require('./src/routes/Admin/authRouter');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri:process.env.MONGODB_URI+"/trade",
    collection : 'sessions'
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store:store,
    cookie: {
        maxAge: 3600000, //1 hr
      }
  }));
app.use(parser.json({extended:true}));
// auth ruoter
app.use('/',authRouter);

app.use(function(err, req, res, next) {
    // console.error(err.stack);
    res.status(err.status).send(err.message);
  });

const resetSessionStorage = async () => {
    try {
      await mongoose.connection.db.collection('sessions').deleteMany({});
      console.log('Session storage reset.');
    } catch (error) {
      console.error('Error resetting session storage:', error);

    }
  };
mongoose.connect(process.env.MONGODB_URI+'/trade').then(result=>{
    resetSessionStorage();
    console.log("connected");
    app.listen(3000);
}).catch(error=>{
    console.log(error);
})