const mongoose = require ('mongoose')
mongoose.connect('mongodb+srv://nivedpk21:nivedpk21@cluster0.cuiosip.mongodb.net/jobportalDB?retryWrites=true&w=majority')

const schema = mongoose.Schema

const buissnessSchema = new schema ({
    name: {type:String},
    phonenumber: {type:String},
    address: {type:String},
    state: {type:String},
    district: {type:String},
    city: {type:String},
    pincode: {type:String},
    category: {type:String},
    loginId: { type: mongoose.Types.ObjectId, ref: "login_tb" },
});

const buissnessModel = mongoose.model('buissness_tb',buissnessSchema)
module.exports = buissnessModel