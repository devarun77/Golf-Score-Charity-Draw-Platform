import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
  drawDate: {
    type: Date,
    default: Date.now
  },

  numbers: {
    type: [Number],
    required: true
  },

  winners: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      matchCount: Number
    }
  ]

}, { timestamps: true });

export default mongoose.model("Draw", drawSchema);