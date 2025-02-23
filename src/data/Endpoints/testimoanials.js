import { destroy, get, post, put } from "../config/config";

export const TestimonialsApi = {
    getTestimonials : (data) => get(`testimonials`, { params: data }),
    postTestimonials : (data) => post(`testimonials/create`, data ),
    updateTestimonials : (id, data) => put(`testimonials/${id}`, data ),
    deleteTestimonials : (id) => destroy(`testimonials/${id}`),
    getSingleTestimonial : (id) => get(`testimonials/${id}`),
}