import axios from "axios";
import { useLocation } from "react-router-dom";


const httpClient = axios.create();

httpClient.interceptors.request.use(
  (req) => {
    req.headers.auth = sessionStorage.getItem("access_token");
    return req;
  },
  () => {}
);

httpClient.interceptors.response.use((response) => {
    if (response.status === 240){
       window.location.href="/login"
    }
  if (response.status === 235) {
    return httpClient
      .get(response.config.url || "", {
        headers: {
          ...response.config.headers,
          refresh: sessionStorage.getItem("refresh_token"),
        },
      })
      .then((res) => {
        Cookies.set("accessToken", res.headers.accesstoken);
        return res;
      });
  }

  return response;
});

export default httpClient;
