import axios from "axios";

const BACKEND_URL = "https://api-zester.herokuapp.com/api/v1";

export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3333/api/v1"
    : BACKEND_URL;

const AxiosInstance = () => {
  console.log("====================================");
  console.log(`USING BACKEND URL: ${url}`);
  console.log("====================================");
  const instance = axios.create({
    baseURL: url,
    timeout: 15000,
  });

  delete instance.defaults.headers.common["Accept"];

  return instance;
};

export default AxiosInstance();
