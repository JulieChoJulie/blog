import axios from 'axios';

const client = axios.create();

/*
  Global setting:

  // Set BaseURL
  client.defaults.baseURL = 'https://external-api-server.com/'
  // Header setting
  client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';
  // Intercepter Setting
  axios.intercepter.response.use(\
    response => {
      // 요청 성공 시 특정 작업 수행
      return response;
    },
    error => {
      // 요청 실패 시 특정 작업 수행
      return Promise.reject(error);
    }
  })
*/

export default client;