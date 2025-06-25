import http from './http';
import { authHelper } from '../helpers';

const GENERATE_ADDRESS = '/generate';
const VIDEO_SCRIPT_ADDRESS = GENERATE_ADDRESS + '/video-script';
const CONTENT_IDEA_ADDRESS = GENERATE_ADDRESS + '/content-idea';
const NEWSLETTER_ADDRESS = GENERATE_ADDRESS + '/newsletter';
const THREAD_ADDRESS = GENERATE_ADDRESS + '/thread';

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
  generateContentIdea: async (prompt: string) => {
    try {
      const response = await http.post(
        CONTENT_IDEA_ADDRESS,
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
  generateNewsletter: async (prompt: string) => {
    try {
      const response = await http.post(
        NEWSLETTER_ADDRESS,
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
  generateThread: async (prompt: string) => {
    try {
      const response = await http.post(
        THREAD_ADDRESS,
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
