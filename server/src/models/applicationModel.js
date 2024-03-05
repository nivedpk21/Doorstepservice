const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://nivedpk21:nivedpk21@cluster0.cuiosip.mongodb.net/jobportalDB?retryWrites=true&w=majority"
);

const schema = mongoose.Schema;

const applicationSchema = new schema({
  loginId: { type: mongoose.Types.ObjectId, ref: "buissness_tb" },
  jobId: { type: mongoose.Types.ObjectId, ref: "job_tb" },
  status: { type: String },
});

const applicationModel = mongoose.model("application_tb", applicationSchema);
module.exports = applicationModel;
