import { generateAPI } from '@/apis/fetch';
import { useChatStore } from '@/store/chatStore';
import { useRef } from 'react';

export const useChatSubmit = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const chatStore = useChatStore();
	const { getCurrentMessages } = useChatStore();

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		//获得用户输入的信息
		if (inputRef.current?.value) {
			const userMessage = inputRef.current.value;
			chatStore.addMessage({
				content: userMessage,
				role: 'user'
			});
			inputRef.current.value = '';

			setTimeout(async () => {
				chatStore.addMessage({
					content: 'Thinking...',
					role: 'model'
				});

				const modelResponse = await generateAPI(getCurrentMessages()!);
				const reader = modelResponse.body?.getReader();
				const decoder = new TextDecoder();
				while (true) {
					const { value } = await reader!.read();
					const result = decoder.decode(value, { stream: true });
					if (result.toString().includes('"finish_reason":"stop"')) {
						break;
					}
					if (!result.toString().includes('"content":null')) {
						const strs = result.split('\n');
						for (const strObj of strs) {
							if (strObj === '') {
								continue;
							}
							const str = strObj.slice(6);

							const jsonStr = JSON.parse(str);

							const apiResponseText = jsonStr.choices[0].delta.content;
							console.log(apiResponseText);
							chatStore.updateMessage(getCurrentMessages()!.at(-1)!.id, {
								...getCurrentMessages()!.at(-1)!,
								content: apiResponseText
							});
						}
					}
				}
			}, 1000);
		}
	};
	return {
		inputRef,
		handleFormSubmit
	};
};
