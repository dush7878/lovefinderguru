import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid admin credentials" });
};
