import LocalStorage from "@/lib/storage";
import { STORAGE_KEY } from "@/lib/storage";
import REQUEST, { REQUEST_TYPE } from ".";

const USERS_ROUTES = {
  GET_USERS: "/admin/users/get-paginated-list-of-users",
  GET_USER_STATS: "/admin/users/get-user-statistics",
};

interface IResponse {
  success: boolean;
  message: string;
}

interface IUserData {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
  accountStatus: "active" | "suspended";
  isPremiumUser: boolean;
}

interface IUserResponse {
  data: IUserData[];
  totalCount: number;
  currentPage: string;
  totalPages: number;
}

export interface IUser extends IResponse {
  data: IUserResponse;
}

interface IUserStatsData {
  totalUsers: {
    count: number;
    monthlyGrowth: number;
  };
  verifiedUsers: {
    count: number;
    percentage: number;
  };
  premiumUsers: {
    count: number;
    percentage: number;
  };
  newUsersThisMonth: {
    count: number;
  };
}

export interface IUserStats extends IResponse {
  data: IUserStatsData;
}

// get all users
const GET_USERS = async (page: number, limit: number): Promise<IUser> => {
  const storage = new LocalStorage();
  const token = storage.read(STORAGE_KEY.ADMINTOKEN) || "";
  const response = await REQUEST(
    REQUEST_TYPE.GET,
    `${USERS_ROUTES.GET_USERS}?page=${page}&limit=${limit}`,
    {},
    token
  );
  return response;
};

// get user stats
const GET_USER_STATS = async (): Promise<IUserStats> => {
  const storage = new LocalStorage();
  const token = storage.read(STORAGE_KEY.ADMINTOKEN) || "";
  const response = await REQUEST(REQUEST_TYPE.GET, USERS_ROUTES.GET_USER_STATS, {}, token);
  return response;
};

export { GET_USER_STATS, GET_USERS };
