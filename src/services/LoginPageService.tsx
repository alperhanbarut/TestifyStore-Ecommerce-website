import type { AxiosResponse } from "axios";
import axios from "../config/AxiosConfig";
import type { UserType } from "../types/Types";

class LoginPageService {
  async login(): Promise<UserType[]> {
    try {
      const response: AxiosResponse<UserType[]> = await axios.get("/users");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new LoginPageService();
