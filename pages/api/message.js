import { postMethod } from "../../utils/http";
import config from '../../config';
import * as moment from 'moment';

const { respondJson, respondOnError } = require("../../utils/respond");
const resultCode = require("../../utils/resultCode");

const sendMessage = (url, body, headers) => postMethod(url, body, headers);

const routerName = "Message";

const routes = async (req, res) => {
  try {
    log(
      "[Logger]::[Controller]::[%sController]::[Access Time %s]",
      routerName,
      moment().format("YYYY-MM-DD HH:mm:ss")
    );

    const {
      user_key,
      content = undefined,
      accessKey,
      accessSecret,
      apiKey
    } = req.body;

    const headers = {
      Authorization: `Basic ${btoa(
        accessKey + ":" + accessSecret
      )}`,
      'User-Agent': req.headers["user-agent"]
    };

    let options = { user_key: user_key };
    if (!isUndefined(content)) options["content"] = content;
    const url = config.api_server.interface_url;

    const { data } = await sendMessage(
      `${url}/test/${apiKey}/message`,
      options,
      headers
    );

    respondJson(res, data.code, data.data);
  } catch (error) {
    return respondOnError(res, resultCode.error, error.message);
  }
};

export default routes;
