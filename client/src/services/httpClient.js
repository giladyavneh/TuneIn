import axios from "axios";
import { useLocation } from "react-router-dom";


const httpClient = axios.create({
  baseURL:"http://localhost:3001/"
});

httpClient.interceptors.request.use(
  (req) => {
    console.log(req.url)
    req.headers.auth = sessionStorage.getItem("access_token");
    return req;
  },
  () => {}
);

httpClient.interceptors.response.use((response) => {
    if (response.status === 240){
      sessionStorage.removeItem('access_token')
      sessionStorage.removeItem('refresh_token')
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
    console.log(response.config)
  if (response.status === 235) {
    console.log("refreshing")
    return httpClient({
      url:response.config.url || "", 
        headers: {
          ...response.config.headers,
          refresh: sessionStorage.getItem("refresh_token"),
        },
        method:response.config.method
      }
    )
      .then((res) => {
        sessionStorage.setItem("access_token", res.headers.accesstoken);
        return res;
      });
  }

  return response;
});

export default httpClient;
