import jwt from "jsonwebtoken"

export const protect = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  next(); 
};
