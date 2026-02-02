import axios from "axios";

//Instance для запросов на сервер
export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "API-KEY": process.env.REACT_APP_API_KEY,
    },
});

instance.interceptors.request.use(function (config) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("td-token")}`;
    return config;
});
