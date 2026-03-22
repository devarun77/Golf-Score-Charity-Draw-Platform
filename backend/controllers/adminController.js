import User from "../model/user.model.js";
import Score from "../model/Score.js";
import Draw from "../model/Draw.js";

// Get all users
export const getAllUsers = async (req, res) => {

    const users = await User.find({ role: { $ne: "admin" } }).select("-password");

    return res.json({
      success: true,
      count: users.length,
      users
    });
  };

//   Get Winners 
  export const getWinners = async (req, res) => {

    const draws = await Draw.find()
      .sort({ createdAt: -1 })
      .populate("winners.userId", "name email");

    const winners = draws.flatMap(draw =>
      draw.winners.map(w => ({
        user: w.userId,
        matchCount: w.matchCount,
        drawDate: draw.drawDate,
        numbers: draw.numbers
      }))
    );

    return res.json({
      success: true,
      winners
    });
  };

  export const getStats = async (req, res) => {

    const totalUsers = await User.countDocuments();
    const totalDraws = await Draw.countDocuments();
    const totalScoreEntries = await Score.countDocuments();

    return res.json({
      success: true,
      stats: {
        totalUsers,
        totalDraws,
        totalScoreEntries
      }
    });
  };

  // Update subscription
export const updateSubscription = async (req, res) => {
    const { userId, status, plan } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        subscription: {
          status,
          plan,
          renewalDate: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    res.json({
      success: true,
      user,
    });
  };


// Scores updation 


export const updateUserScores = async (req, res) => {
  
    const { userId, scores } = req.body;

    const scoreDoc = await Score.findOneAndUpdate(
      { userId },
      { scores },
      { returnDocument: 'after' }
    );

    res.json({
      success: true,
      scores: scoreDoc,
    });

  };