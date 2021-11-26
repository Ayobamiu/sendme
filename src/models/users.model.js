const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    access: {
      type: String,
      enum: ["admin", "worker"],
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString(), user },
    process.env.JWT_SECRET
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (req, res, email, password) => {
  //check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({
      error: "404 not found",
      message: "Email is not registered",
    });
  }

  //compare if the password matches the password for the user
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(205).send({
      error: "205 Credentials not a match",
      message: "Credential is not a match",
    });
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
