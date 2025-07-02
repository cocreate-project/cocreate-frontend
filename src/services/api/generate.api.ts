import http from './http';
import { authHelper } from '../helpers';
import { AxiosError } from 'axios';

const GENERATE_ADDRESS = '/generate';
const GENERATIONS_ADDRESS = '/generations';
const VIDEO_SCRIPT_ADDRESS = GENERATE_ADDRESS + '/video-script';
const CONTENT_IDEA_ADDRESS = GENERATE_ADDRESS + '/content-idea';
const NEWSLETTER_ADDRESS = GENERATE_ADDRESS + '/newsletter';
const THREAD_ADDRESS = GENERATE_ADDRESS + '/thread';

interface Generation {
  id: number;
  type: 'video_script' | 'content_idea' | 'newsletter' | 'thread';
  prompt: string;
  content: string;
  created_at: string;
  saved: boolean;
}

interface NewsletterContent {
  subject: string;
  title: string;
  content: string[];
}

interface ApiErrorResponse {
  success: false;
  message: string;
}

interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  generations?: Generation[];
  saved_generations?: Generation[];
  generation?: Generation;
  data?: T;
}

const generateApi = {
  // Generation endpoints
  generateVideoScript: async (prompt: string) => {
    try {
      const response = await http.post<ApiSuccessResponse<string>>(
        VIDEO_SCRIPT_ADDRESS,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${authHelper.getAccessToken()}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response?.data as ApiErrorResponse;
      }
      throw error;
    }
  },

  generateContentIdea: async (prompt: string) => {
    try {
      const response = await http.post<ApiSuccessResponse<string>>(
        CONTENT_IDEA_ADDRESS,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${authHelper.getAccessToken()}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response?.data as ApiErrorResponse;
      }
      throw error;
    }
  },

  generateNewsletter: async (prompt: string) => {
    try {
      const response = await http.post<ApiSuccessResponse<NewsletterContent>>(
        NEWSLETTER_ADDRESS,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${authHelper.getAccessToken()}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response?.data as ApiErrorResponse;
      }
      throw error;
    }
  },

  generateThread: async (prompt: string) => {
    try {
      const response = await http.post<ApiSuccessResponse<string[]>>(
        THREAD_ADDRESS,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${authHelper.getAccessToken()}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response?.data as ApiErrorResponse;
      }
      throw error;
    }
  },

  // Generations management endpoints
  getAllGenerations: async () => {
    try {
      const response = await http.get<ApiSuccessResponse<Generation[]>>(
        GENERATIONS_ADDRESS,
        {
          headers: {
            Authorization: `Bearer ${authHelper.getAccessToken()}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response?.data as ApiErrorResponse;
      }
      throw error;
    }
  },

  getGenerationById: async (genId: number) => {
    try {
      const response = await http.get<ApiSuccessResponse<Generation>>(
        `${GENERATIONS_ADDRESS}/${genId}`,
        {
          headers: {
            Authorization: `Bearer ${authHelper.getAccessToken()}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response?.data as ApiErrorResponse;
      }
      throw error;
    }
  },

  getSavedGenerations: async () => {
    try {
      const response = await http.get<ApiSuccessResponse<Generation[]>>(
        `${GENERATIONS_ADDRESS}/saved`,
        {
          headers: {
            Authorization: `Bearer ${authHelper.getAccessToken()}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response?.data as ApiErrorResponse;
      }
      throw error;
    }
  },

  saveGeneration: async (genId: number) => {
    try {
      const response = await http.post<ApiSuccessResponse<void>>(
        `${GENERATIONS_ADDRESS}/save`,
        { gen_id: genId },
        {
          headers: {
            Authorization: `Bearer ${authHelper.getAccessToken()}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response?.data as ApiErrorResponse;
      }
      throw error;
    }
  },

  unsaveGeneration: async (genId: number) => {
    try {
      const response = await http.post<ApiSuccessResponse<void>>(
        `${GENERATIONS_ADDRESS}/unsave`,
        { gen_id: genId },
        {
          headers: {
            Authorization: `Bearer ${authHelper.getAccessToken()}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response?.data as ApiErrorResponse;
      }
      throw error;
    }
  },

  exportGenerations: async () => {
    try {
      const response = await http.get<ApiSuccessResponse<Generation[]>>(
        `${GENERATIONS_ADDRESS}/export`,
        {
          headers: {
            Authorization: `Bearer ${authHelper.getAccessToken()}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return error.response?.data as ApiErrorResponse;
      }
      throw error;
    }
  },
};

export default generateApi;
