import axios from "axios";
import LocalStorage, { STORAGE_KEY } from "@/lib/storage";
const BASEURL = "http://localhost:7890/api";

export enum REQUEST_TYPE {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const REQUEST = async (type: REQUEST_TYPE, url: string, data?: any) => {
  try {
    const storage = new LocalStorage();
    const token = storage.read(STORAGE_KEY.TOKEN);
    const response = await axios({
      method: type,
      url: `${BASEURL}${url}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
