const express = require("express");
const messageRouter = express.Router();
const checkAuth = require("../middleware/checkAuth");
const messageModel = require("../models/messageModel");
const mongoose = require("mongoose");

// send message (user to buissness)

messageRouter.post("/sendmessage/:id", checkAuth, async (req, res) => {
  const userId = req.userData.userId;
  const buissnessID = req.params.id;
  console.log("buissnessID for message", buissnessID);

  const time = new Date();
  const currentTime = time.getTime();
  console.log("current", currentTime);

  try {
    const messageData = {
      message: req.body.message,
      userId: userId,
      buissnessId: req.params.id,
      time: currentTime,
      type: "sent",
    };
    console.log("messageData", messageData);
    const saveMessage = await messageModel(messageData).save();
    if (saveMessage) {
      return res.status(200).json({
        message: "message sent",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// reply message (buissness to user)

messageRouter.post("/savereplymessage/:id", checkAuth, async (req, res) => {
  const buissnessID = req.userData.userId;
  const userId = req.params.id;
  const replyMessage = req.body.message;
  console.log("replymessage", replyMessage);

  const time = new Date();
  const currentTime = time.getTime();
  console.log("current", currentTime);

  try {
    const messageData = {
      message: req.body.message,
      userId: userId,
      buissnessId: buissnessID,
      time: currentTime,
      type: "reply",
    };
    console.log("messageData", messageData);
    const saveMessage = await messageModel(messageData).save();
    if (saveMessage) {
      return res.status(200).json({
        message: "reply message sent",
      });
    }
  } catch (error) {
    console.log(error);
  }
});


// view message (in buissness /messages page)

messageRouter.get("/viewbuissnessmessage", checkAuth, async (req, res) => {
  const buissnessId = req.userData.userId;
  console.log("buissnessId", buissnessId);

  try {
    await messageModel
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
            buissnessId: new mongoose.Types.ObjectId(buissnessId),
          },
        },
        {
          $group: {
            _id: { loginID: "$result.loginId" },
            name: { $first: "$result.name" },
            loginId: { $first: "$result.loginId" },
          },
        },
      ])
      .then((messageData) => {
        return res.status(200).json({
          data: messageData,
          message: "message data fetched successfully",
          sucess: true,
          error: false,
        });
      });
  } catch (error) {
    console.log(error);
  }
});


// view message in chatting part (buissness page)

messageRouter.get("/viewchatmessage/:id", checkAuth, async (req, res) => {
  const userId = req.params.id;
  const buissnessId = req.userData.userId;

  const messageData = await messageModel.find({ buissnessId: buissnessId, userId: userId });
  if (messageData) {
    return res.status(200).json({
      data: messageData,
    });
  }
});

//  view messages in user page

messageRouter.get("/viewmessage", checkAuth, async (req, res) => {
  const userId = req.userData.userId;

  try {
    await messageModel
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
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $group: {
            _id: { loginID: "$result.loginId" },
            businessname: { $first: "$result.businessname" },
            loginId: { $first: "$result.loginId" },
          },
        },
      ])
      .then((messagedata) => {
        return res.status(200).json({
          data: messagedata,
        });
      });
  } catch (error) {
    console.log(error);
  }
});

// view user chatting/reply page

messageRouter.get("/viewuserchat/:id", checkAuth, async (req, res) => {
  const userId = req.userData.userId;
  const buissnessId = req.params.id;

  const messageData = await messageModel.find({ buissnessId: buissnessId, userId: userId });
  if (messageData) {
    return res.status(200).json({
      data: messageData,
    });
  }
}); 

module.exports = messageRouter;
