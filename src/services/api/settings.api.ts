import http from './http';
import { authHelper } from '../helpers';

const SETTINGS_CONTENT_TYPE_ADDRESS = '/settings/content-type';
const SETTINGS_TARGET_AUDIENCE_ADDRESS = '/settings/target';
const SETTINGS_ADDITIONAL_CONTEXT_ADDRESS = '/settings/additional-context';

const settingsApi = {
  setContentType: async (contentType: string) => {
    try {
      const response = await http.post(
        SETTINGS_CONTENT_TYPE_ADDRESS,
        {
          content_type: contentType,
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
  setTargetAudience: async (targetAudience: string) => {
    try {
      const response = await http.post(
        SETTINGS_TARGET_AUDIENCE_ADDRESS,
        {
          target_audience: targetAudience,
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
  setAdditionalContext: async (additionalContext: string) => {
    try {
      const response = await http.post(
        SETTINGS_ADDITIONAL_CONTEXT_ADDRESS,
        {
          additional_context: additionalContext,
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

export default settingsApi;
