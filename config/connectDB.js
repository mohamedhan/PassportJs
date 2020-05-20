const mongoose = require("mongoose");

const config = require("config");

module.exports = connectDB = () => {
  mongoose
    .connect(config.get("MONGOURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true
    })
    .then(() => console.log("mongoose connected"))
    .catch((err) => console.log(err));
};
