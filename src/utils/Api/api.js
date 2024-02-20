// import axios from 'axios';
// import { requestHandler, successHandler, errorHandler } from './interceptor';

// const baseURL ="http://localhost:8080/api/"

// const token = localStorage.getItem('token');
// console.log('Token:',typeof token);
// const ApiFn = () =>
// 	axios.create({
// 		// baseURL: import.meta.env.VITE_APP_BASE_URL,
// 		baseURL,
// 		headers: {
// 			'ngrok-skip-browser-warning': true,
// 			'Content-type': 'application/json',
// 			'Access-Control-Allow-Origin': '*',
// 			'origin-name': window.location.origin.toString(),
// 			// 'Authorization':"Bearer"+localStorage.getItem('token')
// 			'Authorization': `Bearer ${token}`,
// },
// 		_retry: false,

// 	});


// const API = ApiFn();
// // Handle request process
// API.interceptors.request.use((request) => requestHandler(request));

// // Handle response process
// API.interceptors.response.use(
// 	(response) => successHandler(response),
// 	(error) => errorHandler(error)
// );

// export default API;



import axios from 'axios';
import { requestHandler, successHandler, errorHandler } from './interceptor';

// const baseURL = "http://localhost:8080/api/";
const baseURL = "https://backend-code-two.vercel.app/api";

const token = localStorage.getItem('token');

const ApiFn = () =>
  axios.create({
    baseURL,
    headers: {
      'ngrok-skip-browser-warning': true,
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'origin-name': window.location.origin.toString(),
      'Authorization': `Bearer ${token}`,
    },
    _retry: false,
  });

const API = ApiFn();

// Handle request process
API.interceptors.request.use((request) => requestHandler(request));

// Handle response process
API.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default API;
