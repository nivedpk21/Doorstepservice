const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://nivedpk21:nivedpk21@cluster0.cuiosip.mongodb.net/jobportalDB?retryWrites=true&w=majority"
);

const schema = mongoose.Schema;

const loginSchema = new schema({
  username: { type: String },
  password: { type: String },
  role: { type: String },
  status: { type: String },
});

const loginModel = mongoose.model("login_tb", loginSchema);
module.exports = loginModel;
