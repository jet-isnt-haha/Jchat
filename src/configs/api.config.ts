//API相关配置
export const apiConfig = {
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http:127.0.0.1:3000',
	endpoints: {
		generate: '/api/generate',
		sessions: '/api/sessions',
		messages: '/api/messages'
	},
	timeout: 10000,
	retryAttempt: 3,
	retryDelay: 1000
} as const;
