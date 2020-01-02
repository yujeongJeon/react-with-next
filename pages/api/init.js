import { postMethod } from '../../utils/http';
const config = require('../../config');

const { respondJson, respondOnError } = require('../../utils/respond');
const resultCode = require('../../utils/resultCode');

const getBotInfo = (url, body, headers) => postMethod(url, body, headers);

const routes = async (req, res) => {
    try {
        const { 
            apiKey,
            accessKey,
            accessSecret
        } = req.body;

        const headers = {
            Authorization: `Basic ${new Buffer(accessKey + ':' + accessSecret).toString('base64')}`
        };

        const { data } = await getBotInfo(
            `http://210.93.145.11:8080/bot/${apiKey}`,
            //`${config.api_server.base_url}/bot/${apiKey}`,
            {},
            headers);
        
        respondJson(res, data.code, data.data);
    } catch (error) {
        log(error);
        return respondOnError(res, resultCode.error, error.message);
    }
}

export default routes;