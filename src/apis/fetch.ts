import { apiConfig } from '@/configs/api.config';
import type { Message } from '~/packages/types/chatType';

export function generateAPI(chatMessages: Message[], signal: AbortSignal) {
	const history = chatMessages.map((msg: Message) => ({
		role: msg.role === 'model' ? 'assistant' : 'user',
		content: msg.content
	}));

	return fetch(`${apiConfig.baseURL}${apiConfig.endpoints.generate}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ history }),
		signal
	});
}
