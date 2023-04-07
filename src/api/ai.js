import http from "@/utils/http";

export const chat = (params) => {
  return http.get(`/mschat/chatstream?message=${params.message}`, {
    open: true,
    stream: true,
  });
};
