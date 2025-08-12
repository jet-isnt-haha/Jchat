import { generateAPI } from '@/apis/fetch';
import { useChatStore } from '@/store/chatStore';
import streamProcessor from '@/utils/streamProcessor';
import { useRef } from 'react';
import { useCreateSession } from './useCreateSession';
export const useChatSubmit = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const {
		getCurrentMessages,
		currentSessionId,
		setIsLoading,
		addMessage,
		updateMessage,
		isLoading
	} = useChatStore();
	const controllerRef = useRef<AbortController | null>(null);
	const { createSession } = useCreateSession();

	//处理用户输入
	const handleUserInput = () => {
		const userInput = inputRef.current?.value;
		if (!userInput) return null;

		if (!currentSessionId) {
			createSession();
		}
		//添加用户消息并清空输入框
		addMessage({
			content: userInput,
			role: 'user'
		});

		inputRef.current!.value = '';

		return userInput;
	};

	//处理流式请求与消息更新
	const fetchAndUpdateResponse = async () => {
		setIsLoading(true);
		addMessage({
			content: 'Thinking...',
			role: 'model',
			isLoading: true
		});

		const controller = new AbortController();
		controllerRef.current = controller;
		try {
			const modelResponse = await generateAPI(
				getCurrentMessages()!,
				controller.signal
			);
			const lastMessage = getCurrentMessages()?.at(-1);
			if (!lastMessage) return;
			await streamProcessor(modelResponse, (accumulatedText) => {
				updateMessage(lastMessage.id, {
					...lastMessage,
					content: accumulatedText
				});
			});
		} catch (error: unknown) {
			if (error instanceof Error && error.name === 'AbortError') {
				console.log('请求被用户取消');
			} else {
				console.error('请求发生错误', error);
			}
		} finally {
			setIsLoading(false);
			controllerRef.current = null;
		}
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isLoading && controllerRef.current) {
			controllerRef.current.abort();
			setIsLoading(false);
			return;
		}

		const userInput = handleUserInput();

		if (userInput) {
			await fetchAndUpdateResponse();
		}
	};

	return {
		inputRef,
		handleFormSubmit,
		isLoading
	};
};
