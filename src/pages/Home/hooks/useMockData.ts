import {
	mockChatSessions,
	generateMockSessions,
	mockUtils
} from '@/mocks/chatData';

export function useMockData() {
	const isDevelopment = process.env.NODE_ENV === 'development';

	return {
		isDevelopment,
		mockSessions: mockChatSessions,
		generateMockSessions,
		mockUtils
	};
}
