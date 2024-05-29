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
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = decodeURIComponent(req.headers.authorization);
  const tokenString = token.split(" ")[1];

  try {
    const decoded = jwt.verify(
      tokenString,
      process.env.JWTKEY || ""
    ) as JwtPayload;
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
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided or incorrect format" });
  }

  const tokenString = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(
      tokenString,
      process.env.JWTKEY || ""
    ) as JwtPayload;
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token or server error" });
  }
};
