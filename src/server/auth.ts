import REQUEST, { REQUEST_TYPE } from ".";

const AUTH_ROUTES = {
  // user auth routes
  LOGIN: "/users/login",
  REGISTER: "/users/create-new-account",
  VERIFY_EMAIL: "/users/verify-user",

  // admin auth routes
  ADMIN_LOGIN: "/auth/admin/login",
  ADMIN_REGISTER: "/auth/admin/register",
  ADMIN_VERIFY_EMAIL: "/auth/admin/verify-email",
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
