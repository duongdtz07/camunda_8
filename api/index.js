const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/users", (req, res) => {
  try {
    const orderId = req.query.orderId;

    if (!orderId) {
      throw new Error("MISSING_PARAMETER");
    }

    res.status(200).json({
      id: orderId,
      message: "SUCCESS",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
