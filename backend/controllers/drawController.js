import Draw from "../model/Draw.js";
import Score from "../model/Score.js";

// Generate 5 unique random numbers (1–45)
const generateDrawNumbers = () => {
  const numbers = new Set();

  while (numbers.size < 5) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }

  return Array.from(numbers);
};

// Run Draw (ADMIN)
export const runDraw = async (req, res) => {

    const drawNumbers = generateDrawNumbers();

    const allScores = await Score.find();
    let winners = [];

    for (const userScore of allScores) {
      const userNumbers = userScore.scores.map(s => s.value);

      // Count matches
      const matchCount = userNumbers.filter(num =>
        drawNumbers.includes(num)
      ).length;

      if (matchCount >= 3) {
        winners.push({
          userId: userScore.userId,
          matchCount
        });
      }
    }

    const draw = await Draw.create({
      numbers: drawNumbers,
      winners
    });

    res.status(200).json({
      success: true,
      draw
    });
  } ;


//   GET Draw Results
  export const getDraws = async (req, res) => {

    const draws = await Draw.find()
      .sort({ createdAt: -1 })
      .populate("winners.userId", "name email");

    res.json({
      success: true,
      draws
    });

  };