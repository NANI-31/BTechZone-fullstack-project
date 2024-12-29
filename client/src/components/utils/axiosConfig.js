import axios from 'axios';

export const axiosConfig = {
  withCredentials: true,
};

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
  withCredentials: true,
});

// const axiosConfig = axios.create({
//     baseURL: process.env.REACT_APP_PUBLIC_API,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// export default axiosConfig;
