import axios from "axios"

const isProd = import.meta.env.PROD

export const apiClient = axios.create({
  baseURL: isProd ? "https://dummyjson.com" : "/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// 응답 인터셉터: 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message)
    return Promise.reject(error)
  },
)

