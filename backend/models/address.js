const Mongoose = require("mongoose");
const { Schema } = Mongoose;

// Address Schema
const AddressSchema = new Schema({
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  district: {
    // quan, huyen
    type: String,
    required: true,
  },
  ward: {
    // thi tran, xa, phuong
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Address", AddressSchema);
