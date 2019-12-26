import { postMethod } from '../../utils/http';
import { isUndefined } from 'fxjs/Strict';
const { respondJson, respondOnError } = require('../../utils/respond');
const resultCode = require('../../utils/resultCode');

const sendMessage = (url, body, headers) => postMethod(url, body, headers);

const routes = async (req, res) => {
    try {
        const { user_key, content = undefined } = req.body;

        const headers = {
            Authorization: `Basic ${new Buffer("279596f7-e3f8-455a-826a-0fae0296946b" + ':' + "da73a9de-b4b2-42f4-9b2a-70aa71fdf1be").toString('base64')}`
        };

        let options = { user_key: user_key };
        if (!isUndefined(content)) options["content"] = content;

        const { data } = await sendMessage(
            "http://210.93.145.11:8080/test/03b0d38e-8636-49db-83ca-0f3437490ac3/message",
            options,
            headers);
        
        respondJson(res, data.code, data.data);
    } catch (error) {
        return respondOnError(res, resultCode.error, error.message);
    }
}

export default routes;