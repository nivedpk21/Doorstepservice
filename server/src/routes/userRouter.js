const express = require("express");
const userModel = require("../models/userModel");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/checkAuth");
const loginModel = require("../models/loginModel");
const mongoose = require("mongoose");
const jobModel = require("../models/jobModel");
const buissnessModel = require("../models/buissnessModel");
const applicationModel = require("../models/applicationModel");
const messageModel = require("../models/messageModel");
const bookingModel = require("../models/bookingModel");
const multer = require("multer");

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    console.log("originalname", file.originalname);
  },
});
const upload = multer({ storage: storage });

// User Registration

userRouter.post("/register", async (req, res) => {
  const hashedpass = await bcrypt.hash(req.body.password, 8);
  try {
    const userData = {
      username: req.body.username,
      password: hashedpass,
      role: "user",
    };

    const existingUsername = await loginModel.findOne({
      username: req.body.username,
    });
    if (existingUsername != null) {
      return res.status(400).json({
        message: "username already registered",
        success: false,
        error: true,
      });
    }

    const existingEmail = await userModel.findOne({ email: req.body.email });
    if (existingEmail != null) {
      return res.status(400).json({
        message: "email already registered",
        success: false,
        error: true,
      });
    }

    const existingPhonenumber = await userModel.findOne({
      phonenumber: req.body.phonenumber,
    });
    if (existingPhonenumber != null) {
      return res.status(400).json({
        message: "phonenumber already registered",
        success: false,
        error: true,
      });
    }

    const saveLogin = await loginModel(userData).save();

    if (saveLogin) {
      const regData = {
        loginId: saveLogin._id,
        name: req.body.name,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        house: req.body.house,
        street: req.body.street,
        town: req.body.town,
        state: req.body.state,
        district: req.body.district,
        city: req.body.city,
        pincode: req.body.pincode,
      };

      const saveReg = await userModel(regData).save();
      if (saveReg) {
        return res.status(200).json({
          message: "user created",
          success: true,
          error: false,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login

userRouter.post("/login", async (req, res) => {
  try {
    const loginData = {
      username: req.body.username,
      password: req.body.password,
    };

    const existingUser = await loginModel.findOne({
      username: loginData.username,
    });
    if (!existingUser) {
      return res.status(400).json({
        message: "user is not registered",
        success: false,
        error: true,
      });
    }

    const existingPassword = existingUser.password;
    const passcheck = await bcrypt.compare(loginData.password, existingPassword);
    if (passcheck) {
      const checkStatus = existingUser.status;
      console.log(checkStatus, "status logged");
      if (checkStatus !== "0") {
        const token = jwt.sign(
          // token creation after successfull login
          {
            username: existingUser.username,
            userId: existingUser._id,
          },
          "this_is_an_encrypt_key",
          { expiresIn: "4h" }
        );

        return res.status(200).json({
          data: existingUser,
          message: "login success",
          token: token,
          success: true,
          error: false,
        });
      } else {
        return res.status(400).json({
          message: "your account is under verification",
        });
      }
    } else {
      res.status(500).json({
        message: "password is incorrect",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error ",
    });
  }
});

// View user profile

userRouter.get("/profile", checkAuth, async (req, res) => {
  const login_id = req.userData.userId; // here  actually loginId in user tb is taken and kept

  try {
    const profileData = await userModel.findOne({ loginId: login_id });
    if (profileData) {
      return res.status(200).json({
        data: profileData,
        message: "user details fetched successfully",
        success: true,
        error: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// edit page

userRouter.get("/editprofile", checkAuth, async (req, res) => {
  const userId = req.userData.userId;
  try {
    wholeData = await userModel
      .aggregate([
        {
          $lookup: {
            from: "login-tbs",
            localField: "loginId",
            foreignField: "_id",
            as: "result",
          },
        },
        {
          $unwind: "$result",
        },
        {
          $match: {
            loginId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $group: {
            _id: "$_id",
            username: { $first: "result.username" },
            email: { $first: "$email" },
            password: { $first: "result.password" },
          },
        },
      ])
      .then((data) => {
        return res.status(200).json({
          data: data,
          message: "profile details fetched successfully",
          success: true,
          error: false,
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

// edit profile and save

userRouter.post("/saveprofile", checkAuth, async (req, res) => {
  const userId = req.userData.userId;
  try {
    const existingUser = await userModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({
        message: "user not found",
        success: false,
        error: true,
      });
    }
    if (existingUser) {
      (existingUser.username = req.body.username),
        (existingUser.email = req.body.email),
        (existingUser.password = req.body.password),
        await existingUser.save();

      return res.status(200).json({
        message: "user details updated successfully",
        success: true,
        error: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

// Delete user

userRouter.get("/deleteuser", checkAuth, async (req, res) => {
  const userId = req.userData.userId;
  try {
    deleteUser = await userModel.findById({ _id: userId });
    if (deleteuser) {
      const logintbId = deleteuser.loginID;
      deleteLogin = await loginModel.deleteOne({ _id: logintbId });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

// post job

userRouter.post("/postjob", checkAuth, upload.single("image"), async (req, res) => {
  const userId = req.userData.userId;

  console.log("bodyee", req.body);
  const imageDetails = req.body.image;
  console.log("imageDetails", imageDetails);

  try {
    const jobData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      city: req.body.city,
      date: req.body.date,
      budget: req.body.budget,
      image: req.file.filename,
      userId: userId,
      status: "0",
    };

    console.log("jobData", jobData);
    const saveJob = await jobModel(jobData).save();
    if (saveJob) {
      return res.status(200).json({
        message: "job submitted for approval",
        succes: true,
        error: false,
      });
    } else {
      return res.status(400).json({
        message: "unable to submit job",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// view posted job

userRouter.get("/viewjobpost", checkAuth, async (req, res) => {
  const userId = req.userData.userId;

  try {
    await jobModel.find({ userId: userId, status: { $in: ["0", "1"] } }).then((response) => {
      console.log(response);
      return res.status(200).json({
        data: response,
        message: "jobs listed succesfully",
        success: true,
        error: false,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//  display job  details for editing

userRouter.get("/viewpostedjob/:id", async (req, res) => {
  const job_id = req.params.id;
  try {
    await jobModel.findOne({ _id: job_id }).then((jobdata) => {
      return res.status(200).json({
        data: jobdata,
        message: "job data fetched successfully",
      });
    });
  } catch (error) {
    console.log(error);
  }
});
// edit and save job

userRouter.post("/savejob/:id", checkAuth, async (req, res) => {
  const user_id = req.userData.userId;
  const job_id = req.params.id;

  try {
    const existingJob = await jobModel.findOne({
      _id: job_id,
      userId: user_id,
    });
    if (existingJob) {
      existingJob.title = req.body.title;
      existingJob.description = req.body.description;
      existingJob.category = req.body.category;
      existingJob.city = req.body.category;
      existingJob.date = req.body.date;
      existingJob.budget = req.body.category;
      existingJob.address = req.body.address;

      await existingJob.save().then((response) => {
        return res.status(200).json({
          message: "job post updated successfully",
        });
      });
    } else {
      return res.status(400).json({
        message: "unable to update job post",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// delete job

userRouter.get("/deletejob/:id", async (req, res) => {
  const jobId = req.params.id;
  try {
    const deletejob = await jobModel.deleteOne({ _id: jobId });
    if (deletejob) {
      return res.status(200).json({
        message: "job deleted successfully",
      });
    }
  } catch (error) {}
});

// view single job

userRouter.get("/viewsinglejob/:id", async (req, res) => {
  const job_id = req.params.id;
  try {
    await jobModel.findById(job_id).then((jobData) => {
      return res.status(200).json({
        data: jobData,
        message: "job data fetched successfully",
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// search service

userRouter.post("/search", async (req, res) => {
  const Category = req.body.category;
  const City = req.body.city;
  console.log("category:", Category);
  console.log("city:", City);

  try {
    const searchresult = await buissnessModel.find({ city: City, category: Category });
    if (searchresult) {
      console.log(searchresult);
      return res.status(200).json({
        data: searchresult,
        message: "search completed successfully",
        success: true,
        error: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "internal server error",
    });
  }
});

// view full buissness profile from search page

userRouter.get("/viewfullbuissnessprofile/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log("api called");
  await buissnessModel.findOne({ _id: id }).then((data) => {
    return res.status(200).json({
      data: data,
      message: "profile data fetched successfully",
      success: true,
      error: false,
    });
  });
});

// view applicants list

// userRouter.get("/viewjobapplications/:id", async (req, res) => {
//   const job_id = req.params.id;
//   console.log("jobid:", job_id);
//   await applicationModel.find({ jobId: job_id }).then((Data) => {
//     return res.status(200).json({
//       data: Data,
//       message: "applicants details fetched successfully",
//       success: true,
//       error: false,
//     });
//   });
// });

// list applicants

userRouter.get("/viewjobapplications/:id", async (req, res) => {
  const job_id = req.params.id;
  console.log("job_id:", job_id);
  try {
    await applicationModel
      .aggregate([
        {
          $lookup: {
            from: "buissness_tbs",
            localField: "loginId",
            foreignField: "loginId",
            as: "result",
          },
        },
        {
          $unwind: "$result",
        },
        {
          $match: {
            jobId: new mongoose.Types.ObjectId(job_id),
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$result.name" },
            city: { $first: "$result.city" },
            loginId: { $first: "$result.loginId" },
            category: { $first: "$result.category" },
          },
        },
      ])
      .then((buissnessDetails) => {
        return res.status(200).json({
          data: buissnessDetails,
          message: "profile details fetched successfully ",
        });
      });
  } catch (error) {
    console.log(error);
  }
});

// view applicant profile

userRouter.get("/viewapplicantprofile/:id", async (req, res) => {
  const login_id = req.params.id;
  console.log("buiss id:", login_id);

  try {
    await buissnessModel.findOne({ loginId: login_id }).then((Data) => {
      return res.status(200).json({
        data: Data,
        message: "profile data fetched successfully",
        success: true,
        error: false,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// update applicant status

userRouter.get("/approvejobapplication/:id/:jobid", async (req, res) => {
  const loginid = req.params.id;
  const jobid = req.params.jobid;
  console.log("loginid approvejob:", loginid);
  console.log("jobid approvejob:", jobid);
  try {
    const updateStatus = await applicationModel.updateOne(
      { loginId: loginid },
      { $set: { status: "1" } }
    );
    console.log("updt sts", updateStatus);
    if (updateStatus) {
      try {
        await jobModel.updateOne({ _id: jobid }, { $set: { status: "2" } }).then((response) => {
          return res.status(200).json({
            message: " status updated successfully",
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//  view appointments

userRouter.get("/appointments", checkAuth, async (req, res) => {
  const loginID = req.userData.userId;
  console.log(loginID);

  try {
    await bookingModel
      .aggregate([
        {
          $lookup: {
            from: "buissness_tbs",
            localField: "buissnessId",
            foreignField: "loginId",
            as: "result",
          },
        },
        {
          $unwind: "$result",
        },
        {
          $match: {
            userId: new mongoose.Types.ObjectId(loginID),
            status: "1",
          },
        },
        {
          $group: {
            _id: "$_id",
            title: { $first: "$title" },
            date: { $first: "$date" },
            jobtype: { $first: "$jobtype" },
            businessname: { $first: "$result.businessname" },
            city: { $first: "$result.city" },
          },
        },
      ])
      .then((data) => {
        return res.status(200).json({
          data: data,
          message: "appointment details fetched successfully",
        });
      });
  } catch (error) {
    return res.status(500).json({ message: " internal server error" });
  }
});

// view buissness details in booking form

userRouter.get("/viewbuissnessdetails/:id", async (req, res) => {
  const buissness_id = req.params.id;

  try {
    await buissnessModel.findOne({ loginId: buissness_id }).then((buissnessData) => {
      return res.status(200).json({
        data: buissnessData,
        message: "buissness details fetched successfully",
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// book service

userRouter.post("/bookservice/:id", checkAuth, async (req, res) => {
  const buissness_id = req.params.id;
  console.log("buissness login id", buissness_id);
  const user_id = req.userData.userId;

  const dt = req.body.date;
  console.log("date", dt);
  try {
    const bookingData = {
      title: req.body.title,
      buissnessId: buissness_id,
      userId: user_id,
      date: req.body.date,
      jobtype: req.body.jobtype,
      description: req.body.description,
      status: "0",
    };
    const saveData = await bookingModel(bookingData).save();
    if (saveData) {
      return res.status(200).json({
        message: "booking request submitted",
      });
    }
  } catch (error) {}
});
module.exports = userRouter;
