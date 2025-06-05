import http from './http';
import { authHelper } from '../helpers';

const AUTH_LOGIN_ADDRESS = '/auth/login';
const AUTH_REGISTER_ADDRESS = '/auth/register';

const authApi = {
  login: async (username: string, password: string) => {
    try {
      const response = await http.post(AUTH_LOGIN_ADDRESS, {
        username,
        password,
      });
      if (response.data.success) {
        authHelper.saveAccessToken(response.data.access_token);
      }
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },
  register: async (username: string, password: string) => {
    try {
      const response = await http.post(AUTH_REGISTER_ADDRESS, {
        username,
        password,
      });
      if (response.data.success) {
        authHelper.saveAccessToken(response.data.access_token);
      }
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },
};

export default authApi;
