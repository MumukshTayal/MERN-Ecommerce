const mongoose = require("mongoose");

let mongoUri =
  "mongodb://127.0.0.1:27017/Ecommerce" || process.env.MONGODB_URI;
if (process.env.FROM_DOCKER === 'true') {
  mongoUri = "mongodb://database:27017/Ecommerce"
}
const connectToMongo = async () => {
  try {
    const connect = await mongoose.connect(mongoUri);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectToMongo;
