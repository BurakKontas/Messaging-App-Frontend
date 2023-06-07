import { allowMethods } from "@/Helpers/allowMetods";
import { generateResult } from "@/Types/Result";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  allowMethods(["POST"], req, res);
  try {
    let token = req.body.token as string;
    let receiver_id = req.query.receiver_id as string;

    let response = await axios.get("http://127.0.0.1:3535/last_message?receiver_id" + receiver_id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.status !== 200) return res.status(400).json(generateResult(response.data, true, 400));

    return res.status(200).json(generateResult(response.data, false, 200));
  } catch (error) {
    return res.status(404).json(generateResult(error, true, 404));
  }
}

export default handler;
