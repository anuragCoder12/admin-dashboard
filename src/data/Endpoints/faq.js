import { destroy, get, post, put } from "../config/config";

export const FaqApi = {
    getFaq: (data) => get(`faq`, { params: data }),
    postFaq: (data) => post(`faq/create`, data),
    updateFaq: (id, data) => put(`faq/${id}`, data),
    deleteFaq: (id) => destroy(`faq/${id}`),
    getSingleFaq: (id) => get(`faq/${id}`),
}