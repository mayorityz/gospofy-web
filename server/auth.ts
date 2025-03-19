import REQUEST, { REQUEST_TYPE } from ".";

const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  VERIFY_EMAIL: "/auth/verify-email",
};

const CREATE_ACCOUNT = async (data: any) => {
  const response = await REQUEST(REQUEST_TYPE.POST, AUTH_ROUTES.REGISTER, data);
  return response;
};

const LOGIN = async (data: any) => {
  const response = await REQUEST(REQUEST_TYPE.POST, AUTH_ROUTES.LOGIN, data);
  return response;
};

const VERIFY_EMAIL = async (data: any) => {
  const response = await REQUEST(REQUEST_TYPE.POST, AUTH_ROUTES.VERIFY_EMAIL, data);
  return response;
};

export { CREATE_ACCOUNT, LOGIN, VERIFY_EMAIL };
