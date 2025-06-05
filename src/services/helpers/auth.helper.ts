const authHelper = {
  saveAccessToken: (accessToken: string) => {
    document.cookie = `accessToken=${accessToken}; path=/; Secure; SameSite=Strict`;
  },
  getAccessToken: () => {
    const cookies = document.cookie.split(';');
    const accessTokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('accessToken='),
    );
    return accessTokenCookie ? accessTokenCookie.split('=')[1] : null;
  },
  removeAccessToken: () => {
    document.cookie =
      'accessToken=; path=/; Secure; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  },
};

export default authHelper;
