import http from './http';
import { authHelper } from '../helpers';

const GENERATE_ADDRESS = '/generate';
const VIDEO_SCRIPT_ADDRESS = GENERATE_ADDRESS + '/video-script';

const generateApi = {
  generateVideoScript: async (prompt: string) => {
    try {
      const response = await http.post(
        VIDEO_SCRIPT_ADDRESS,
        {
          prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${authHelper.getAccessToken()}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  },
};

export default generateApi;
