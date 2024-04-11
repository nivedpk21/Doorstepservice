const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://nivedpk21:nivedpk21@cluster0.cuiosip.mongodb.net/jobportalDB?retryWrites=true&w=majority"
);

const schema = mongoose.Schema;

const buissnessSchema = new schema({
  businessname: { type: String },
  phonenumber: { type: String },
  building: { type: String },
  street: { type: String },
  town: { type: String },
  city: { type: String },
  district: { type: String },
  state: { type: String },
  pincode: { type: String },
  category: { type: String },
  loginId: { type: mongoose.Types.ObjectId, ref: "login_tb" },
  email: { type: String },
});

const buissnessModel = mongoose.model("buissness_tb", buissnessSchema);
module.exports = buissnessModel;
