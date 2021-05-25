import dbConnect from "@libs/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

const database = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    await dbConnect();
  } catch (error) {
    console.log(error.message);
  }
  next();
};

export default database;
