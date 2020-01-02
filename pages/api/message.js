import { postMethod } from '../../utils/http';
import { isUndefined } from 'fxjs/Strict';
const config = require('../../config');

const { respondJson, respondOnError } = require('../../utils/respond');
const resultCode = require('../../utils/resultCode');

const sendMessage = (url, body, headers) => postMethod(url, body, headers);

const routes = async (req, res) => {
    try {
        const { 
            user_key, 
            content = undefined, 
            accessKey,
            accessSecret,
            apiKey 
        } = req.body;

        const headers = {
            Authorization: `Basic ${new Buffer(accessKey + ':' + accessSecret).toString('base64')}`
        };

        let options = { user_key: user_key };
        if (!isUndefined(content)) options["content"] = content;
        
        const { data } = await sendMessage(
            `http://210.93.145.11:8080/test/${apiKey}/message`,
            //`${config.api_server.base_url}/test/${apiKey}/message`,
            options,
            headers);
        
        respondJson(res, data.code, data.data);
    } catch (error) {
        return respondOnError(res, resultCode.error, error.message);
    }
}

export default routes;