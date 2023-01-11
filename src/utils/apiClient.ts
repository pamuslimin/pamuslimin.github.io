import { showNotification } from "@mantine/notifications"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
const client = ({ baseURL = "https://api.smarteconomy.id", ...options }: AxiosRequestConfig) => {
  const instance = axios.create({
    baseURL,
    ...options,
  })

  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      }
      return config
    }
    config.headers = {
      Authorization: `Basic ${btoa("project-se:!!8zCQv2#jxzi7")}`,
    }
    return config
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    ({ response }: AxiosError) => {
      if (response && response.status === 401) {
        localStorage.clear()
        window.dispatchEvent(new Event("storage"))
        showNotification({
          title: "Sesi Telah Berakhir",
          message: "Harap Login Kembali",
          color: "yellow",
        })
      }
      return Promise.reject(response)
    },
  )
  return instance
}

export default client
