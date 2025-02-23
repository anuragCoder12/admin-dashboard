import { destroy, get, post } from "../config/config";

export const CategoryApi = {
    getCat: (data) => get(`category`, { params: data }),
    postCat: (data) => post(`category/create`, data),
    deleteCat: (id) => destroy(`category/${id}`),
    
}