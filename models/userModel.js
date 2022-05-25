const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    session: { type: String },
    verify_code: { type: String },
    authenticated: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)