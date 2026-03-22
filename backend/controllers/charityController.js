import User from "../model/user.model.js";

// Static charity list
export const getCharities = (req, res) => {
  const charities = [
    { name: "Save Children" },
    { name: "Green Earth" },
    { name: "Cancer Care" }
  ];

  res.json({ charities });
};

// Select charity
export const selectCharity = async (req, res) => {

    const userId = req.user._id;
    const { name, percentage } = req.body;

    if (percentage < 10) {
      return res.status(400).json({
        message: "Minimum contribution is 10%"
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        charity: { name, percentage }
      },
      { new: true }
    );

    res.json({
      success: true,
      charity: user.charity
    });

  } 