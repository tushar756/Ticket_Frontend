// import axios from "axios";

// export const isHandlerEnabled = (config = {}) =>
//   !(config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled);

// export const requestHandler = (request) => {
//   if (isHandlerEnabled(request)) {
//     let Token = null;
//     Token = JSON.parse(localStorage.getItem("token"));
//     if (Token) {
//       request.headers.Authorization = `Bearer ${Token}`;
//     }
//   }
//   return request;
// };

// export const successHandler = (response) => {
//   return response;
// };
// let isRefreshing = false;
// let subscribers = [];

// function subscribeTokenRefresh(cb) {
//   subscribers.push(cb);
// }

// export const errorHandler = (error) => {
//   console.log(error, "error");
//   if (isHandlerEnabled(error.config)) {
//     const originalRequest = error.config;
//     if (error.response.status === 401) {
//       if (!isRefreshing) {
//         window.location.href = "/error404";
//         isRefreshing = true;
//       }
//       const retryOrigReq = new Promise((resolve) => {
//         subscribeTokenRefresh((token) => {
//           originalRequest.headers.Authorization = token;
//           resolve(axios(originalRequest));
//         });
//       });
//       return retryOrigReq;
//     }
//   }
//   return Promise.reject({ ...error });
// };
import axios from "axios";

// export const isHandlerEnabled = (config = {}) => !(config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled);
export const isHandlerEnabled = (config = {}) => !(Object.prototype.hasOwnProperty.call(config, "handlerEnabled") && !config.handlerEnabled);


export const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    let token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
  }
  return request;
};

export const successHandler = (response) => {
  return response;
};

let isRefreshing = false;
let subscribers = [];

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

// export const errorHandler = (error) => {
//   console.log(error, "error");
//   if (isHandlerEnabled(error.config)) {
//     const originalRequest = error.config;
//     if (error.response.status === 401) {
//       if (!isRefreshing) {
//         window.location.href = "/error404";
//         isRefreshing = true;
//       }
//       const retryOrigReq = new Promise((resolve) => {
//         subscribeTokenRefresh((token) => {
//           originalRequest.headers.Authorization = token;
//           resolve(axios(originalRequest));
//         });
//       });
//       return retryOrigReq;
//     }
//   }
//   return Promise.reject({ ...error });
// };
export const errorHandler = (error) => {
  console.log(error, "error");
  if (isHandlerEnabled(error.config)) {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        window.location.href = "/error404";
        isRefreshing = true;
      }
      const retryOrigReq = new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = token;
          resolve(axios(originalRequest));
        });
      });
      return retryOrigReq;
    }
  }
  return Promise.reject({ ...error });
};