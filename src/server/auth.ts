import REQUEST, { REQUEST_TYPE } from ".";

const AUTH_ROUTES = {
  // user auth routes
  LOGIN: "/users/login",
  REGISTER: "/users/create-new-account",
  VERIFY_EMAIL: "/users/verify-user",

  // admin auth routes
  ADMIN_LOGIN: "/admin/login",
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

const ADMIN_LOGIN = async (data: any) => {
  const response = await REQUEST(REQUEST_TYPE.POST, AUTH_ROUTES.ADMIN_LOGIN, data);
  return response;
};

export { CREATE_ACCOUNT, LOGIN, VERIFY_EMAIL, ADMIN_LOGIN };
