import axios from 'axios';
const BASE_URL = 'http://localhost:5000';

export default axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

export const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
});
// export const axiosConfig = {
//   withCredentials: true,
// };

// const axiosConfig = axios.create({
//     baseURL: process.env.REACT_APP_PUBLIC_API,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// export default axiosConfig;
