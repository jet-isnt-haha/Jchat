import { generateAPI } from '@/apis/fetch';
import { useChatStore } from '@/store/chatStore';
import streamProcessor from '@/utils/streamProcessor';
import { useRef } from 'react';

export const useChatSubmit = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const chatStore = useChatStore();
	const { getCurrentMessages } = useChatStore();

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		//获得用户输入的信息
		if (inputRef.current?.value) {
			const userMessage = inputRef.current.value;
			chatStore.addMessage({
				content: userMessage,
				role: 'user'
			});

			inputRef.current.value = '';

			chatStore.addMessage({
				content: 'Thinking...',
				role: 'model'
			});

			const modelResponse = await generateAPI(getCurrentMessages()!);
			const lastMessage = getCurrentMessages()?.at(-1);
			if (!lastMessage) return;
			await streamProcessor(modelResponse, (accumulatedText) => {
				chatStore.updateMessage(lastMessage.id, {
					...lastMessage,
					content: accumulatedText
				});
			});
		}
	};
	return {
		inputRef,
		handleFormSubmit
	};
};
