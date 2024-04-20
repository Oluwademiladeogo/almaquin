import { Request, Response, NextFunction } from "express";
import { User } from "../models/users";
import * as jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  name: string;
  phone: string;
  role: string;
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.authToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTKEY || "") as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
export const ensureAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.authToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTKEY || "") as JwtPayload;
    const user = await User.findById(decoded.id);
    if (!user || user.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
