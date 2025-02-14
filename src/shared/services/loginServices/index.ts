import type { TLoginServices } from "./types";
import axios from "axios";
// import { BACKEND_URL } from "@/shared/constants/backendConstants.ts"
export const BACKEND_URL = "https://sputnic.tech/mobile_api";

const loginServices: TLoginServices = {
  login: async (data) => axios.post(`https://sputnic.tech/mobile_api/token/login`, data).then(({ data }) => data),
};

export default loginServices;
