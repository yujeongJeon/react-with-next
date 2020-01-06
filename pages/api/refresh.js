import { postMethod } from "../../utils/http";
import config from '../../config';

const { respondJson, respondOnError } = require("../../utils/respond");
const resultCode = require("../../utils/resultCode");

const refreshSession = (url, body, headers) => postMethod(url, body, headers);

const routes = async (req, res) => {
  try {
    const {
      user_key,
      accessKey,
      accessSecret,
      apiKey
    } = req.body;

    const headers = {
      Authorization: `Basic ${new Buffer(
        accessKey + ":" + accessSecret
      ).toString("base64")}`
    };

    let options = { user_key: user_key };
    const url = config.api_server.interface_url;
    
    const { data } = await refreshSession(
      `${url}/test/${apiKey}/refresh`,
      options,
      headers
    );

    if (!data) throw { message: "Can not Get Message From Server" };

    return respondJson(res, data.code, data.data);
  } catch (error) {
    log(error);
    return respondOnError(res, resultCode.error, error.message);
  }
};

export default routes;
