const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const field = {
  password: { type: String },
  email: { type: String },
};

let reference = {
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
};

const globalSchema = mongoose.Schema(
  Object.assign(field, reference),
  { collection: "User" },
  { timestamps: true },
);

globalSchema.statics.encryptPassword = async (password) => {
    const value = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, value);
};
  
globalSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

globalSchema.pre("save", async function save(next) {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = { Model: mongoose.model("User", globalSchema), reference };
