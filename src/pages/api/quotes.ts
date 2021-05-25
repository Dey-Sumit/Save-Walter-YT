import database from "@middlewares/database";
import Quote from "@models/Quote";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { NextHandler } from "next-connect";

const handler = nextConnect();

handler.use(database);

handler.get(
  async (_1: NextApiRequest, res: NextApiResponse, _3: NextHandler) => {
    try {
      const quotes = await Quote.find({});

      res.status(200).json(quotes);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Server Broken" });
    }
  }
);

export default handler;
