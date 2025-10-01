import axios from "axios"
import type { AxiosResponse, AxiosError } from "axios";

interface ErrorI {
  message: string;
}

interface InfoI {
    data: {
        some: string
    }
}

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})


async function getInfo(id: string) {
    try {
        return {
            data: true
        }
        const response: AxiosResponse<InfoI> = await instance.get(`/info/${id}`)

        return {
            data: response.data.data,
            status: response.status,
            statusText: response.statusText
        }; 
    } catch (e) {
        const error = e as AxiosError<ErrorI>
        console.error(e)
        throw {
            error: error.response?.data.message || error.message,
            code: error.code || 500
        }
    }
}

export {
    getInfo
}