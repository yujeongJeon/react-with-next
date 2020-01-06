/**
 * @desc response controller
 */

const respondHtml = (res, tpl, obj) => {
  res.render(tpl, obj);
};

const respondJson = (res, code, obj, status) => {
  return status
    ? res.status(status).json({
        code: code,
        data: obj
      })
    : res.json({ code: code, data: obj });
};

const respondOnError = (res, code, obj, status) => {
  return status
    ? res.status(status).json({
        code: code,
        data: obj
      })
    : res.json({ code: code, data: obj });
};

module.exports = {
  respondHtml,
  respondJson,
  respondOnError
};
