import axios from "axios";

export async function getMethod(endpoint, params = {}, headers = {}) {
  return await axios
    .get(endpoint, { params }, { headers: headers })
    .then(response => response)
    .catch(error => {
      return error;
    });
}

export async function postMethod(endpoint, body = {}, headers = {}) {
  return await axios
    .post(endpoint, body, { headers: headers })
    .then(response => response)
    .catch(error => {
      return error;
    });
}

export async function formMethod(
  endpoint,
  body,
  headers = { "Content-Type": "multipart/form-data" }
) {
  return await axios({
    method: "post",
    url: endpoint,
    data: body,
    headers: headers
  })
    .then(response => response)
    .catch(error => error);
}