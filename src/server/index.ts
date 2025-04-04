import axios from "axios";
import LocalStorage, { STORAGE_KEY } from "@/lib/storage";
// const BASEURL = "http://ec2-18-212-59-188.compute-1.amazonaws.com:7890/api";
const BASEURL = "https://api.gospofy.com/api";
// const BASEURL = "http://localhost:7890/api";

export enum REQUEST_TYPE {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const REQUEST = async (type: REQUEST_TYPE, url: string, data?: any, _token?: string) => {
  try {
    let token = "";
    let headers = {};

    const storage = new LocalStorage();

    token = storage.read(STORAGE_KEY.TOKEN) || "";

    if (!_token) {
      headers = {
        Authorization: `Bearer ${token}`,
      };
    } else {
      headers = {
        Authorization: `Bearer ${_token}`,
      };
    }

    const response = await axios({
      method: type,
      url: `${BASEURL}${url}`,
      data,
      headers,
    });

    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export default REQUEST;
