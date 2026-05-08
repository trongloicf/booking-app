import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    extra: {
      BASE_URL: process.env.BASE_URL,
      TOKEN_USER: process.env.TOKEN_USER,
      USER_INFO: process.env.USER_INFO,
    },
  };
};
