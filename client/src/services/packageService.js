import api from "./api";

export const getPackages = () => api.get("/packages");
export const createPackage = (pkg) => api.post("/packages", pkg);
export const updatePackage = (id, pkg) => api.put(`/packages/${id}`, pkg);
export const deletePackage = (id) => api.delete(`/packages/${id}`);
