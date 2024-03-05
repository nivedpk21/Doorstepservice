const express = require("express");
const buissnessModel = require("../models/buissnessModel");
const mongoose = require("mongoose");
const loginModel = require("../models/loginModel");
const jobModel = require("../models/jobModel");
const adminRouter = express.Router();

adminRouter.get("/buissnessverification", async (req, res) => {
  try {
    wholeDetails = await buissnessModel
      .aggregate([
        {
          $lookup: {
            from: "login_tbs",
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
            "result.status": "0",
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            username: { $first: "$result.username" },
            email: { $first: "$email" },
            phonenumber: { $first: "$phonenumber" },
            address: { $first: "$address" },
            state: { $first: "$state" },
            district: { $first: "$district" },
            city: { $first: "$city" },
            pincode: { $first: "$pincode" },
            status: { $first: "$result.status" },
            loginid: { $first: "$result._id" },
          },
        },
      ])
      .then((data) => {
        console.log(data);
        if (data) {
          return res.status(200).json({
            data: data,
            message: "profile details fetched successfully",
            success: true,
            error: false,
          });
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ------------<>-------------------------

adminRouter.get("/viewbuissnessprofile/:id", async (req, res) => {
  const viewProfile_id = req.params.id;
  console.log("id:", viewProfile_id);
  try {
    wholeDetails = await buissnessModel
      .aggregate([
        {
          $lookup: {
            from: "login_tbs",
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
            _id: new mongoose.Types.ObjectId(viewProfile_id),
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            username: { $first: "$result.username" },
            email: { $first: "$email" },
            phonenumber: { $first: "$phonenumber" },
            address: { $first: "$address" },
            state: { $first: "$state" },
            district: { $first: "$district" },
            city: { $first: "$city" },
            pincode: { $first: "$pincode" },
            loginid: { $first: "$result._id" },
          },
        },
      ])
      .then((data) => {
        console.log(data);
        return res.status(200).json({
          data: data[0],
          message: "nice",
          success: true,
          error: false,
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
      error: true,
    });
  }
});

// update status - approve

adminRouter.get("/updatestatus/:Id", async (req, res) => {
  const buissnessId = req.params.Id;

  try {
    const updateStatus = await loginModel.findOneAndUpdate(
      { _id: buissnessId },
      { $set: { status: "1" } },
      { new: true }
    );

    if (updateStatus) {
      return res.status(200).json({
        message: "status updated successfully",
      });
    } else {
      return res.status(400).json({
        message: "unable to update status",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Job listings for approval

adminRouter.get("/jobapprovals", async (req, res) => {
  try {
    await jobModel.find({ status: "0" }).then((data) => {
      return res.status(200).json({
        data: data,
        message: "jobs listed for approval",
        success: true,
        error: false,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "internal server error" });
  }
});

// view job for approval

adminRouter.get("/viewjobpost/:id", async (req, res) => {
  const viewJob_id = req.params.id;
  await jobModel.findOne({ _id: viewJob_id }).then((response) => {
    return res.status(200).json({
      data: response,
      message: "job data fetched succesfully",
      sucess: true,
      error: false,
    });
  });
});

// update job status

adminRouter.get("/updatejobstatus/:id", async (req, res) => {
  const jobId = req.params.id;

  try {
    const updateStatus = await jobModel.findOneAndUpdate(
      { _id: jobId },
      { $set: { status: "1" } },
      { new: true }
    );

    if (updateStatus) {
      return res.status(200).json({
        message: "status updated successfully",
      });
    } else {
      return res.status(400).json({
        message: "status update failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

module.exports = adminRouter;
