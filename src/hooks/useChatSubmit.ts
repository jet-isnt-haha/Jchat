import { generateAPI } from '@/apis/fetch';
import streamProcessor from '@/utils/streamProcessor';
import { useRef } from 'react';
import type { Message } from '~/packages/types/chatType';
import { useChatStore } from '@/store';
import getChatActionsStrategy from './chatStrategies/getChatActionsStrategy';

export const useChatSubmit = () => {
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const {
		currentSessionId,
		addMessage,
		updateMessage,
		getMessage,
		deleteMessage,
		currentController,
		setCurrentController,
		clearCurrentController,
		findSessionById,
		chatMode
	} = useChatStore();
	const strategy = getChatActionsStrategy(chatMode);
	const isLoading = strategy.handleGetMessages().at(-1)?.isLoading;
	//处理用户输入
	const handleUserInput = async () => {
		const userInput = inputRef.current?.value;
		if (!userInput) return null;

		switch (chatMode) {
			case 'normal': {
				if (
					!currentSessionId ||
					(currentSessionId && !findSessionById(currentSessionId))
				) {
					await strategy.handleCreateSession();
				}
				break;
			}
			case 'temp': {
				strategy.handleCreateSession();
				break;
			}
		}
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
		const messages = strategy.handleGetMessages();
		const lastMessage = messages.at(-1);
		const messageId = lastMessage!.id;
		const controller = new AbortController();
		setCurrentController(controller);

		try {
			const modelResponse = await generateAPI(
				[...messages, ...delta],
				controller.signal
			);

			if (!lastMessage) return;
			await streamProcessor(modelResponse, (accumulatedText) => {
				updateMessage(messageId, {
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
				await setMessageIsLoading(messageId, false);
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
		const userInput = await handleUserInput();

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
