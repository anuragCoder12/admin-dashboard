const { get, post, put, destroy } = require("../config/config");

export const RegionsApi = {
    getRegions: (data) => get(`region`, { params: data }),
    getSingleRegion: (regionId) => get(`region/${regionId}`),
    postRegion: (data) => post(`region/create`, data ),
    updateRegion: (regionId, data) => put(`region/${regionId}`, data ),
    deleteRegion: (regionId) => destroy(`region/${regionId}`),
}