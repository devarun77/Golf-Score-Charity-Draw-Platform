import Score from "../model/Score.js";

// Add Score
export const addScore = async (req, res) => {
    const userId = req.user._id;
    const { value, date } = req.body;

    // Validation
    if (!value || value < 1 || value > 45) {
      return res.status(400).json({ message: "Score must be between 1 and 45" });
    }

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    let scoreDoc = await Score.findOne({ userId });

    // If no document  create new
    if (!scoreDoc) {
      scoreDoc = await Score.create({
        userId,
        scores: [{ value, date }]
      });
    } else {
      // Add new score
      scoreDoc.scores.push({ value, date });

      // Keep only last 5 scores
      if (scoreDoc.scores.length > 5) {
        scoreDoc.scores = scoreDoc.scores
          .sort((a, b) => new Date(a.date) - new Date(b.date)) // oldest first
          .slice(-5); // keep latest 5
      }

      await scoreDoc.save();
    }

    res.status(200).json({
      success: true,
      scores: scoreDoc.scores.sort((a, b) => new Date(b.date) - new Date(a.date)) // latest first
    });

  }

export const getScores = async (req, res) => {

    const userId = req.user._id;

    const scoreDoc = await Score.findOne({ userId });

    if (!scoreDoc) {
      return res.json({ scores: [] });
    }

    const sortedScores = scoreDoc.scores.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.json({
      success: true,
      scores: sortedScores
    });

  } 
