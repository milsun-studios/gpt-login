import http from "@/utils/http";

export const login = (data) => {
  return http.post("/mschat/login", data);
};

export const usage = (data) => {
  return http.post("/mschat/checktotal", data);
};
