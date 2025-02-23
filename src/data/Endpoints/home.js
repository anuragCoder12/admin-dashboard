import { get, post } from "../config/config";

export const Homepi = {
    get: () => get(`page/homePage`),
    post: (data) => post(`page/homePage/create`, data),
}