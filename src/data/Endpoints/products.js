import { destroy, get, post, put } from "../config/config";

export const ProductsApi = {
    getProducts: (data) => get(`product`, { params: data }),
    deleteProduct: (id) => destroy(`product/${id}`),
    postProduct: (data) => post(`product/create`, data),
    getSingleProduct: (id) => get(`product/${id}`),
    updateProduct: (id, data) => put(`product/${id}`, data),
}