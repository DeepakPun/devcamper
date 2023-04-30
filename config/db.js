const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedtopology: true,
  });
  console.log(
    `Mongodb connection established: ${conn.connection.host}`.cyan.underline
      .bold
  );
};

module.exports = connectDB;
