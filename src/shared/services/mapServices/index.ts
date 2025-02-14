import type { TMapServices } from "./types";
import axiosAuth from "../axiosAuth";
// import { BACKEND_URL } from "@/shared/constants/backendConstants.ts"
export const BACKEND_URL = "https://sputnic.tech/mobile_api";

const mapServices: TMapServices = {
  getRoutesPoint: async (data) => axiosAuth.post(`https://sputnic.tech/mobile_api/getRoutesPoint`, data)
    .then(({ data }) => data),
};

export default mapServices;
