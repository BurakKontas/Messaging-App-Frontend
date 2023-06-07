import { allowMethods } from "@/Helpers/allowMetods";
import { generateResult } from "@/Types/Result";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Encrypter } from "@/Helpers/encrypt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  allowMethods(["POST"], req, res);
  try {
    let { username, password } = req.body;
    if (!username || !password) return res.status(400).json(generateResult("Username or Password is Empty", true, 400));

    var encrypter = new Encrypter(username);

    let response = await axios.post("http://127.0.0.1:3535/add_user", {
      email: username,
      password,
      public_key: encrypter.getPublicKey(),
    });

    if (response.status !== 200) return res.status(400).json(generateResult(response.data, true, 400));

    return res.status(200).json(generateResult(response.data, false, 200));
  } catch (error) {
    return res.status(404).json(generateResult(error, true, 404));
  }
}

export default handler;
