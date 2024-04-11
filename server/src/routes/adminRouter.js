const express = require("express");
const buissnessModel = require("../models/buissnessModel");
const mongoose = require("mongoose");
const loginModel = require("../models/loginModel");
const jobModel = require("../models/jobModel");
const adminRouter = express.Router();

// list buissness for verification
adminRouter.get("/buissnessverification", async (req, res) => {
  try {
    await buissnessModel
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
            businessname: { $first: "$businessname" },
            username: { $first: "$result.username" },
            city: { $first: "$city" },
            district: { $first: "$district" },
            state: { $first: "$state" },
            pincode: { $first: "$pincode" },
            category: { $first: "$category" },
          },
        },
      ])
      .then((data) => {
        console.log(data);
        if (data) {
          return res.status(200).json({
            data: data,
            message: "buissness data fetched successfully",
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

// view business profile for verification
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
            businessname: { $first: "$businessname" },
            username: { $first: "$result.username" },
            email: { $first: "$email" },
            phonenumber: { $first: "$phonenumber" },
            building: { $first: "$building" },
            street: { $first: "$street" },
            town: { $first: "$town" },
            city: { $first: "$city" },
            district: { $first: "$district" },
            state: { $first: "$state" },
            pincode: { $first: "$pincode" },
            loginId: { $first: "$result._id" },
            category: { $first: "$category" },
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

// approve business

adminRouter.get("/updatestatus/:Id", async (req, res) => {
  const buissnessId = req.params.Id;
  console.log("buissnessId", buissnessId);

  try {
    const updateStatus = await loginModel.findOneAndUpdate(
      { _id: buissnessId },
      { $set: { status: "1" } },
      { new: true }
    );

    if (updateStatus) {
      return res.status(200).json({
        message: "business approved successfully",
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

// list jobs for approval

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
  const Job_id = req.params.id;
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
            _id: new mongoose.Types.ObjectId(Job_id),
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

// update job status

adminRouter.get("/updatejobstatus/:id", async (req, res) => {
  const jobId = req.params.id;
  console.log(jobId);

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
