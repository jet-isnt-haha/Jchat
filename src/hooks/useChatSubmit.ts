import { generateAPI } from '@/apis/fetch';
import streamProcessor from '@/utils/streamProcessor';
import { useRef } from 'react';
import { useCreateSession } from './useCreateSession';
import type { Message } from '~/packages/types/chatType';
import { useChatStore } from '@/store';

export const useChatSubmit = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const {
		getCurrentMessages,
		currentSessionId,
		addMessage,
		updateMessage,
		getMessage,
		deleteMessage,
		currentController,
		setCurrentController,
		clearCurrentController
	} = useChatStore();
	const { createSession } = useCreateSession();
	const isLoading = getCurrentMessages().at(-1)?.isLoading;

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

	//改变MessageIsLoading方法
	const setMessageIsLoading = (messageId: string, chosen: boolean) => {
		updateMessage(messageId, {
			...getMessage(messageId)!,
			isLoading: chosen
		});
	};
	//处理流式请求与消息更新
	const fetchAndUpdateResponse = async (delta: Message[] = []) => {
		addMessage({
			content: 'Thinking...',
			role: 'model',
			isLoading: true
		});
		const messageId = getCurrentMessages().at(-1)!.id;
		const controller = new AbortController();
		setCurrentController(controller);

		try {
			const modelResponse = await generateAPI(
				[...getCurrentMessages()!, ...delta],
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
			setMessageIsLoading(messageId, false);
		} catch (error: unknown) {
			if (error instanceof Error && error.name === 'AbortError') {
				if (getMessage(messageId)?.content === 'Thinking...') {
					deleteMessage(messageId);
				}
				setMessageIsLoading(messageId, false);
				console.log('请求被用户取消');
			} else {
				console.error('请求发生错误', error);
			}
		} finally {
			clearCurrentController();
		}
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isLoading && currentController) {
			currentController.abort();
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
		isLoading,
		fetchAndUpdateResponse
	};
};
