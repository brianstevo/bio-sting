const mongoose = require('mongoose');

const URI = "mongodb+srv://<name>:<PWD>@cluster0.i2pyq.mongodb.net/blogs?retryWrites=true&w=majority"

const connectDB = async () => {
    await mongoose.connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log('db connected..!');
  };

module.exports = connectDB;