const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const { isEmail } = require("validator"); //to validate the email at the model level

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
    minlength: [6, "Minimum length is 6 characters"],
  },
});

//a function that fires before the user is saved to the db
userSchema.pre("save", async function (next) {
  //async = kui mingi koodi töö on tehtud, siis alles liigume edasi
  console.log("a user is about to be saved", this);
  const salt = await bcrypt.genSalt(); //await = ootame natuke
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
