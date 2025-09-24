import { generateAPI } from '@/apis/fetch';
import streamProcessor from '@/utils/streamProcessor';
import type { Message } from '~/packages/types/chatType';
import { useChatStore } from '@/store';
import getChatActionsStrategy from './chatStrategies/getChatActionsStrategy';
import { useAutoResizeTextarea } from './home/useAutoResizeTextArea';

export const useChatSubmit = () => {
	const { textareaRef: inputRef } = useAutoResizeTextarea();
	const {
		currentSessionId,
		addMessage,
		updateMessage,
		getMessage,
		deleteMessage,
		currentController,
		setCurrentController,
		clearCurrentController,
		chatMode
	} = useChatStore();
	const strategy = getChatActionsStrategy(chatMode);
	const isLoading = strategy.handleGetMessages().at(-1)?.isLoading;
	//处理用户输入
	const handleUserInput = () => {
		const userInput = inputRef.current?.value;
		console.log(inputRef.current);
		if (!userInput) return null;

		switch (chatMode) {
			case 'normal': {
				if (!currentSessionId) {
					strategy.handleCreateSession();
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
