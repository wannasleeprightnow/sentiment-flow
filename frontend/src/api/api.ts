import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

export interface ErrorI {
  message: string;
}

export interface TopicI {
  title: string;
  topic_id: string;
}

export interface TopicsI {
  total_count: number;
  topics: TopicI[];
}

export interface ReviewI {
  date: string
  sentiment: "положительно" | "отрицательно" | "нейтрально"
}

interface ReviewsI {
  reviews: ReviewI[],
  total_count: number
}

interface LoginI {
  description: string;
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

async function getTopics() {
  try {
    const response: AxiosResponse<TopicsI> = await instance.get(`/topic`);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (e) {
    const error = e as AxiosError<ErrorI>;
    throw {
      error: error.response?.data.message || error.message,
      status: error.status || 500,
    };
  }
}

interface GetInfoByIdI {
	id: string,
	options: {
		from_date?: string | null;
		to_date?: string | null;
	}
}

async function getInfoByTopicsId({id, options}: GetInfoByIdI) {

  try {
    const response: AxiosResponse<ReviewsI> = await instance.get(`/review/${id}?from_date=${options?.from_date ?? null}&to_date=${options.to_date ?? null}`);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (e) {
    const error = e as AxiosError<ErrorI>;
    console.error(e);
    throw {
      error: error.response?.data.message || error.message,
      status: error.status || 500,
    };
  }
}

async function postLogin(email: string, pass: string) {
  try {
    const response: AxiosResponse<LoginI> = await instance.post("/auth/login", {
      username: email,
      password: pass,
    });

    return {
      data: response.data.description,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (e) {
    const error = e as AxiosError<ErrorI>;
    throw {
      error: error.response?.data.message || error.message,
      status: error.status || 500,
    };
  }
}

async function postLogout() {
  try {
    const response: AxiosResponse<LoginI> = await instance.post("/auth/logout");

    return {
      data: response.data.description,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (e) {
    const error = e as AxiosError<ErrorI>;
    throw {
      error: error.response?.data.message || error.message,
      status: error.status || 500,
    };
  }
}

export { getTopics, getInfoByTopicsId, postLogin, postLogout };
