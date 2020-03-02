import { postMethod } from "../../utils/http";
import config from '../../config';
import * as moment from 'moment';

const { respondJson, respondOnError } = require("../../utils/respond");
const resultCode = require("../../utils/resultCode");

const refreshSession = (url, body, headers) => postMethod(url, body, headers);

const routerName = "Refresh";

const routes = async (req, res) => {
  try {
    log(
      "[Logger]::[Controller]::[%sController]::[Access Time %s]",
      routerName,
      moment().format("YYYY-MM-DD HH:mm:ss")
    );

    const {
      user_key,
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
    const url = config.api_server.interface_url;
    
    const { data } = await refreshSession(
      `${url}/api/${apiKey}/refresh`,
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
