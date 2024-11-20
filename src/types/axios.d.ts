import axios, { Axios, AxiosResponse, AxiosRequestConfig } from 'axios'

declare module 'axios' {
  interface AxiosResponse<T = any> {
    message: string
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance
}
