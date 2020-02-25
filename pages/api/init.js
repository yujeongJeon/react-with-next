import { postMethod } from "../../utils/http";
import config from '../../config';
import * as moment from 'moment';

const { respondJson, respondOnError } = require("../../utils/respond");
const resultCode = require("../../utils/resultCode");

const getBotInfo = (url, body, headers) => postMethod(url, body, headers);

const routerName = "Init";

const routes = async (req, res) => {
  try {
    log(
      "[Logger]::[Controller]::[%sController]::[Access Time %s]",
      routerName,
      moment().format("YYYY-MM-DD HH:mm:ss")
    );

    const { apiKey, accessKey, accessSecret } = req.body;

    const headers = {
      Authorization: `Basic ${btoa(
        accessKey + ":" + accessSecret
      )}`,
      'User-Agent': req.headers["user-agent"]
    };
    const url = config.api_server.interface_url;

    const { data } = await getBotInfo(
      `${url}/bot/${apiKey}`,
      {},
      headers
    );

    respondJson(res, data.code, data.data);
  } catch (error) {
    log(error);
    return respondOnError(res, resultCode.error, error.message);
  }
};

export default routes;
