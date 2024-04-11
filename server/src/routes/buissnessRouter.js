const express = require("express");
const buissnessRouter = express.Router();
const bycrypt = require("bcryptjs");
const checkAuth = require("../middleware/checkAuth");
const userModel = require("../models/userModel");
const loginModel = require("../models/loginModel");
const jwt = require("jsonwebtoken");
const jobModel = require("../models/jobModel");
const mongoose = require("mongoose");
const buissnessModel = require("../models/buissnessModel");
const applicationModel = require("../models/applicationModel");
const bookingModel = require("../models/bookingModel");
const userRouter = require("./userRouter");

// Buissness Registration

buissnessRouter.post("/register", async (req, res) => {
  console.log(req.body);
  const city = req.body.city.toLowerCase();
  const category = req.body.category.toLowerCase();

  const hashedpass = await bycrypt.hash(req.body.password, 8);
  try {
    const businessData = {
      username: req.body.username,
      password: hashedpass,
      role: "buissness",
      status: "0",
    };

    const existingUsername = await loginModel.findOne({
      username: req.body.username,
    });
    console.log("existingUsername", existingUsername);
    if (existingUsername != null) {
      return res.status(400).json({
        message: "username registered",
        success: false,
        error: true,
      });
    }

    const existingPhonenumber = await buissnessModel.findOne({
      phonenumber: req.body.phonenumber,
    });
    if (existingPhonenumber != null) {
      return res.status(400).json({
        message: "phone number is already registered",
        success: false,
        error: true,
      });
    }

    const existingEmail = await buissnessModel.findOne({
      email: req.body.email,
    });
    console.log("existingEmail", existingEmail);
    if (existingEmail != null) {
      return res.status(400).json({
        message: "email is already registered",
        success: false,
        error: true,
      });
    }
    const saveLogin = await loginModel(businessData).save();
    if (saveLogin) {
      const regdata = {
        businessname: req.body.businessname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        building: req.body.building,
        street: req.body.street,
        town: req.body.town,
        city: city,
        district: req.body.district,
        state: req.body.state,
        pincode: req.body.pincode,
        loginId: saveLogin._id,
        category: category,
      };
      const saveReg = await buissnessModel(regdata).save();
      if (saveReg) {
        return res.status(200).json({
          message: "buissness created",
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

// buissness login

buissnessRouter.post("/login", async (req, res) => {
  try {
    const loginData = {
      username: req.body.username,
      password: req.body.password,
    };

    const existingUser = await loginModel.findOne({
      username: req.body.username,
    });
    if (!existingUser) {
      return res.status(400).json({
        message: "username is not registered",
        success: false,
        error: true,
      });
    }

    const existingPassword = existingUser.password;
    const passcheck = await bycrypt.compare(loginData.password, existingPassword);

    if (passcheck) {
      const checkStatus = existingUser.status;
      console.log(checkStatus, "stauts logged");
      if (checkStatus !== 0) {
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
          message: "ypur account is under verification",
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

// View Buissness profile

buissnessRouter.get("/profile", checkAuth, async (req, res) => {
  const userId = req.userData.userId;
  console.log(userId, "user id logged");
  try {
    const data = await buissnessModel.findOne({ loginId: userId });
    if (data) {
      return res.status(200).json({
        data: data,
        message: "profile details fetched successfully",
        success: true,
        error: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// view profile page for editing

buissnessRouter.get("/editbuissnessprofile", checkAuth, async (req, res) => {
  const userId = req.userData.userId;
  try {
    wholeDetails = await buissnessModel
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
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $group: {
            name: { $first: "$name" },
            username: { $first: "result.username" },
            email: { $first: "$email" },
            phonenumber: { $first: "$phonenumber" },
            password: { $first: "result.password" },
            address: { $first: "$address" },
            state: { $first: "$state" },
            district: { $first: "$district" },
            city: { $first: "$city" },
            pincode: { $first: "$pincode" },
            category: { $first: "$category" },
          },
        },
      ])
      .then((data) => {
        return res.status(200).json({
          data: data,
          message: "profile details feched successfully",
          success: true,
          error: false,
        });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// edit and save profile

buissnessRouter.post("/saveprofile", async (req, res) => {
  const userId = req.userdata.id;
  try {
    const existingProfile = await buissnessModel.findById(userId);
    if (!existingProfile) {
      return res.status(404).json({ message: "profile not found" });
    }

    if (existingProfile) {
      existingProfile.name = req.body.name;
      existingProfile.username = req.body.username;
      existingProfile.email = req.body.email;
      existingProfile.phonenumber = req.body.phonenumber;
      existingProfile.password = req.body.password;
      existingProfile.address = req.body.address;
      existingProfile.state = req.body.state;
      existingProfile.district = req.body.district;
      existingProfile.city = req.body.city;
      existingProfile.pincode = req.body.pincode;

      await existingProfile.save();
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

// view job listings

buissnessRouter.post("/viewjoblist", async (req, res) => {
  const searchterm = req.body.category;
  console.log("CheckCategory", searchterm);
  try {
    await jobModel.find({ category: searchterm, status: "1" }).then((data) => {
      console.log("data hh", data);

      return res.status(200).json({
        data: data,
        message: "jobs listed successfully",
        success: true,
        error: false,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

// view listed job details

buissnessRouter.get("/viewjobdetails/:id", async (req, res) => {
  const jobId = req.params.id;
  console.log("id:", jobId);

  try {
    await jobModel.findOne({ _id: jobId }).then((data) => {
      return res.status(200).json({
        data: data,
        message: "job details fetched successfully",
        success: true,
        error: false,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// viewjobonsearch

buissnessRouter.get("/viewjobonsearch/:id", async (req, res) => {
  const jobid = req.params.id;
  try {
    await jobModel
      .aggregate([
        {
          $lookup: {
            from: "user_tbs",
            localField: "userId",
            foreignField: "loginId",
            as: "result",
          },
        },
        {
          $unwind: "$result",
        },
        {
          $match: {
            _id: new mongoose.Types.ObjectId(jobid),
          },
        },
        {
          $group: {
            _id: "$_id",
            title: { $first: "$title" },
            description: { $first: "$description" },
            category: { $first: "$category" },
            city: { $first: "$city" },
            date: { $first: "$date" },
            budget: { $first: "$budget" },

            name: { $first: "$result.name" },
            email: { $first: "$result.email" },
            phonenumber: { $first: "$result.phonenumber" },
            house: { $first: "$result.house" },
            street: { $first: "$result.street" },
            town: { $first: "$result.town" },
            state: { $first: "$result.state" },
            district: { $first: "$result.district" },
            pincode: { $first: "$result.pincode" },
            city: { $first: "$result.city" },
          },
        },
      ])
      .then((response) => {
        return res.status(200).json({
          data: response[0],
          message: "job details",
        });
      });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

// apply job

buissnessRouter.post("/apply/:id", checkAuth, async (req, res) => {
  const loginid = req.userData.userId;
  console.log("loginId:", loginid);
  const jobid = req.params.id;
  console.log("jobid:", jobid);

  try {
    const applicationData = {
      loginId: loginid,
      jobId: jobid,
      status: "0",
    };
    const saveData = await applicationModel(applicationData).save();
    console.log("savedata", saveData);
    if (saveData) {
      return res.status(200).json({
        message: "job application success",
        success: true,
        error: false,
      });
    } else {
      return res.status(400).json({
        message: "unable to process application ",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "internal server error" });
  }
});

// list job applications
buissnessRouter.get("/viewjobapplications", checkAuth, async (req, res) => {
  const loginid = req.userData.userId;

  console.log("loginid:", loginid);

  try {
    await applicationModel
      .aggregate([
        {
          $lookup: {
            from: "jobpost_tbs",
            localField: "jobId",
            foreignField: "_id",
            as: "result",
          },
        },
        {
          $unwind: "$result",
        },
        {
          $match: {
            loginId: new mongoose.Types.ObjectId(loginid),
            status: "0",
          },
        },
        {
          $group: {
            _id: "$_id",
            title: { $first: "$result.title" },
            category: { $first: "$result.category" },
            city: { $first: "$result.city" },
            budget: { $first: "$result.budget" },
            status: { $first: "$status" },
          },
        },
      ])
      .then((jobdata) => {
        return res.status(200).json({
          data: jobdata,
          message: "job applications fetched successfully",
          success: true,
          error: false,
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

// view single job application
buissnessRouter.get("/viewapplication/:id", async (req, res) => {
  const ID = req.params.id;
  console.log(ID);

  try {
    await jobModel
      .aggregate([
        {
          $lookup: {
            from: "user_tbs",
            localField: "userId",
            foreignField: "loginId",
            as: "result",
          },
        },
        {
          $unwind: "$result",
        },
        // {
        //   $match: {
        //     _id: new mongoose.Types.ObjectId(ID),
        //   },
        // },
        // {
        //   $group: {
        //     _id: "$_id",
        //     title: { $first: "$title" },
        //     description: { $first: "$description" },
        //     category: { $first: "$category" },
        //     city: { $first: "$city" },
        //     date: { $first: "$date" },
        //     budget: { $first: "$budget" },

        //     name: { $first: "$result.name" },
        //     email: { $first: "$result.email" },
        //     phonenumber: { $first: "$result.phonenumber" },
        //     house: { $first: "$result.house" },
        //     street: { $first: "$result.street" },
        //     town: { $first: "$result.town" },
        //     state: { $first: "$result.state" },
        //     district: { $first: "$result.district" },
        //     pincode: { $first: "$result.pincode" },
        //     city: { $first: "$result.city" },
        //   },
        // },
      ])
      .then((response) => {
        return res.status(200).json({
          data: response[0],
          message: "job details",
        });
      });
  } catch (error) {}
});

// view appointments

buissnessRouter.get("/viewjobappointments", checkAuth, async (req, res) => {
  const ID = req.userData.userId;
  console.log("buissnessid", ID);

  try {
    await applicationModel
      .aggregate([
        {
          $lookup: {
            from: "jobpost_tbs",
            localField: "jobId",
            foreignField: "_id",
            as: "result",
          },
        },
        {
          $unwind: "$result",
        },
        {
          $match: {
            loginId: new mongoose.Types.ObjectId(ID),
            status: "1",
          },
        },
        {
          $group: {
            _id: "$_id",
            jobId: { $first: "$jobId" },
            title: { $first: "$result.title" },
            date: { $first: "$result.date" },
            userId: { $first: "$result.userId" },
            description: { $first: "$result.description" },
            budget: { $first: "$result.budget" },
          },
        },
      ])
      .then((data) => {
        return res.status(200).json({
          data: data,
          message: "job data",
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

// customer details
buissnessRouter.get("/viewuserdetails/:id", async (req, res) => {
  const userId = req.params.id;
  console.log("userId", userId);
  try {
    const userData = await userModel.findOne({ loginId: userId });
    if (userData) {
      return res.status(200).json({
        data: userData,
        message: "userdata",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

// view single jobappointments details

buissnessRouter.get("/viewjobappointments/:id", async (req, res) => {
  const ID = req.params.id;
  console.log("buissnessid", ID);

  try {
    await applicationModel
      .aggregate([
        {
          $lookup: {
            from: "jobpost_tbs",
            localField: "jobId",
            foreignField: "_id",
            as: "result",
          },
        },
        {
          $unwind: "$result",
        },
        {
          $match: {
            _id: new mongoose.Types.ObjectId(ID),
            status: "1",
          },
        },
        {
          $group: {
            _id: "$_id",
            jobId: { $first: "$jobId" },
            title: { $first: "$result.title" },
            date: { $first: "$result.date" },
            userId: { $first: "$result.userId" },
            description: { $first: "$result.description" },
            budget: { $first: "$result.budget" },
            category: { $first: "$result.category" },
          },
        },
      ])
      .then((data) => {
        return res.status(200).json({
          data: data[0],
          message: "job data",
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

// mark job as completed
buissnessRouter.get("/jobfinished/:applicationid/:jobid", async (req, res) => {
  const applicationId = req.params.applicationid;
  const jobID = req.params.jobid;

  try {
    const updateapplication = await applicationModel.findOneAndUpdate(
      { _id: applicationId },
      { $set: { status: "2" } },
      { new: true }
    );
    if (updateapplication) {
      const updateJob = await jobModel.findOneAndUpdate(
        { _id: jobID },
        { $set: { status: "2" } },
        { new: true }
      );
      if (updateJob) {
        return res.status(200).json({
          message: "task marked as completed",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

// enquiries

buissnessRouter.get("/enquiries", checkAuth, async (req, res) => {
  const buissness_id = req.userData.userId;

  console.log("buissnessid", buissness_id);

  try {
    await bookingModel.find({ buissnessId: buissness_id, status: "0" }).then((bookingData) => {
      return res.status(200).json({
        data: bookingData,
        message: "booking enquiries fetched successfully",
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// accept booking
buissnessRouter.get("/acceptbooking/:id", async (req, res) => {
  const bookingId = req.params.id;

  try {
    const updatestatus = await bookingModel.findOneAndUpdate(
      { _id: bookingId },
      { $set: { status: "1" } }
    );

    if (updatestatus) {
      return res.status(200).json({
        message: "booking approved successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// reject boooking
buissnessRouter.get("/rejectbooking/:id", async (req, res) => {
  const booking_id = req.params.id;
  try {
    const rejectBooking = await bookingModel.findOneAndUpdate(
      { _id: booking_id },
      { $set: { status: "2" } }
    );
    if (rejectBooking) {
      return res.status(200).json({
        message: "booking rejected  ",
      });
    }
  } catch (error) {}
});

// list bookings in appointments

buissnessRouter.get("/bookingappointments", checkAuth, async (req, res) => {
  const buissness_id = req.userData.userId;

  try {
    await bookingModel.find({ buissnessId: buissness_id, status: "1" }).then((bookingData) => {
      return res.status(200).json({
        data: bookingData,
        message: "booking data fetched succesfully",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

// view single booking
buissnessRouter.get("/bookingappointments/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const Data = await bookingModel.findOne({ _id: ID });
    if (Data) {
      return res.status(200).json({
        data: Data,
        message: "user data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

// mark as booked task completed
buissnessRouter.get("/updatebooking/:id", async (req, res) => {
  const bookingID = req.params.id;
  console.log(bookingID);
  try {
    const updatestatus = await bookingModel.findOneAndUpdate(
      { _id: bookingID },
      { $set: { status: "2" } },
      { new: true }
    );
    if (updatestatus) {
      return res.status(200).json({
        message: "marked booking task as completed",
      });
    } else {
      return res.status(400).json({
        data: Data,
        message: "unable to update status",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});
module.exports = buissnessRouter;
