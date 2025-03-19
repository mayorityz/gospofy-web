import axios from "axios";
import Storage, { STORAGE_KEY } from "../src/lib/storage";
const BASEURL = "http://localhost:8000/app";

export enum REQUEST_TYPE {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const REQUEST = async (type: REQUEST_TYPE, url: string, data?: any) => {
  try {
    const token = Storage.read(STORAGE_KEY.TOKEN);
    const response = await axios({
      method: type,
      url: `${BASEURL}${url}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default REQUEST;
