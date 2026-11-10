import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export const getCards = async () => {
  const foo = await sql`SELECT * from DECKS`;
};
