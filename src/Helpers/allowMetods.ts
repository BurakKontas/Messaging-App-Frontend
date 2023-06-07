import { Result } from "@/Types/Result";
import type { NextApiRequest, NextApiResponse } from "next";

export const allowMethods = (methods: string[], req: NextApiRequest, res: NextApiResponse) => {
  if (req.method && methods.includes(req.method)) {
    return true;
  }
  return res.status(405).json({
    data: "Method not allowed",
    code: 405,
    error: true,
  } as Result);
};
