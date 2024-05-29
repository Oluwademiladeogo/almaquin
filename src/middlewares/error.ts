import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Error occurred:", err);

  res
    .status(500)
    .send({ details: "An error occurred on the server" });

  next(err); 
};

export default errorHandler;
