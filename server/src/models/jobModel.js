const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://nivedpk21:nivedpk21@cluster0.cuiosip.mongodb.net/jobportalDB?retryWrites=true&w=majority"
);

const schema = mongoose.Schema;

const jobSchema = new schema({
  title: { type: String },
  description: { type: String },
  category: { type: String },
  city: { type: String },
  date: { type: String },
  budget: { type: Number },
  image: { type: String },
  userId: { type: mongoose.Types.ObjectId, ref: "user_tb" },
  status: { type: String },
});

const jobModel = mongoose.model("jobpost_tb", jobSchema);
module.exports = jobModel;
