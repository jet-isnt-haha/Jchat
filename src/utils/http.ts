import axios, {
	type AxiosInstance,
	// type AxiosResponse,
	type InternalAxiosRequestConfig
} from 'axios';

const http: AxiosInstance = axios.create({
	baseURL: '/api',
	timeout: 10000
});

http.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// http.interceptors.response.use(
// 	(response: AxiosResponse) => {},
// 	(error) => {}
// );

export const apiGet = <T>(url: string, params?: unknown): Promise<T> => {
	return http.get(url, { params });
};

export const apiPost = <T>(url: string, data?: unknown): Promise<T> => {
	return http.post(url, data);
};

export default http;
