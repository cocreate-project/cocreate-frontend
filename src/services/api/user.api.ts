import http from './http';
import { authHelper } from '../helpers';

const USER_ADDRESS = '/user';

const userApi = {
  getUser: async () => {
    try {
      const response = await http.get(USER_ADDRESS, {
        headers: {
          Authorization: `Bearer ${authHelper.getAccessToken()}`,
        },
      });
      return response.data;
    } catch (error: any) {
      authHelper.removeAccessToken();
      return error.response.data;
    }
  },
};

export default userApi;
