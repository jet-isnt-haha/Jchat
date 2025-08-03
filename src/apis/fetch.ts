import type { Message } from '~/packages/types/chatType';

export function generateAPI(chatMessages: Message[]) {
	const history = chatMessages.map((msg: Message) => ({
		role: msg.role === 'model' ? 'assistant' : 'user',
		content: msg.content
	}));

	return fetch('http://127.0.0.1:3000/api/generate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ history })
	});
}
