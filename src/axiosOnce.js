import axios from "axios";

let call;
const axiosOnce = (config = {}) => {
  if (call) {
    call.cancel("Only one request allowed at a time.");
  }
  call = axios.CancelToken.source();

  config.cancelToken = call.token
  return axios(config);
};

export default axiosOnce;