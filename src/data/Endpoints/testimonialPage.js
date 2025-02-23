import { get, post } from "../config/config";

export const TestimonialPageApi = {
    postTestimonialPage: (data) => post(`page/testimonialPage/create`, data ),
    getTestimonialPage: () => get(`page/testimonialPage`)
    
}