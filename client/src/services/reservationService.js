import api from "./api";

export const createReservation = async (data) => {
  const res = await api.post("/reservations", data);
  return res.data;
};

export const getMyReservations = async () => {
  const res = await api.get("/reservations/");
  return res.data;
};
