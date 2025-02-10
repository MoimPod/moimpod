import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // 베이스 URL 설정
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
