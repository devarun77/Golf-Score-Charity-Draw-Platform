import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true // one document per user
  },
  scores: [
    {
      value: {
        type: Number,
        required: true,
        min: 1,
        max: 45
      },
      date: {
        type: Date,
        required: true
      }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Score", scoreSchema);