import axios from "axios";

const productionDomain = "https://ester-api.herokuapp.com";
const developmentDomain = "http://localhost";
export const environment = process.env.NODE_ENV;

export const domain =
  environment === "development" ? developmentDomain : productionDomain;

const AxiosInstance = () => {
  let url = domain;

  if(environment === "development") {
    url += ":3333";
  } else if (environment === "production") {
    // do nothing
  }
  
  url += "/api/v1"

  console.log("====================================");
  console.log(`USING BACKEND URL: ${url}`);
  console.log("====================================");
  const instance = axios.create({
    baseURL: url,
    timeout: 10000,
  });

  delete instance.defaults.headers.common["Accept"];

  return instance;
};

export default AxiosInstance();
