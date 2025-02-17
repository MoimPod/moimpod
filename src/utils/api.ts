import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`, // 백엔드 주소
  withCredentials: true, // 쿠키 자동 전송 활성화
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("token"); // 쿠키에서 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 헤더 자동 추가
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 쿠키에서 특정 값 가져오는 함수
function getCookie(name: string) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export default api;
